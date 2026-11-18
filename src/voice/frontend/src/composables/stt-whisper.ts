import type { STTProvider, STTCallbacks } from './stt-types'
import { useTranscriber } from './use-transcriber'
import { useAudio } from './use-audio'
import { defaultConfig, type VoiceConfig } from './config'

export function createWhisperSTT(_config: VoiceConfig = defaultConfig): STTProvider {
  const locale = document.documentElement.lang || navigator.language
  const model = locale.toLowerCase().startsWith('en')
    ? 'onnx-community/whisper-base.en'
    : 'onnx-community/whisper-base'
  const asr = useTranscriber(model)
  const audio = useAudio()
  let vad: any = null
  let callbacks: STTCallbacks | null = null
  let stopped = false

  async function startVAD(voicePath: string) {
    if (vad) {
      try { vad.pause() } catch {}
      try { vad.destroy() } catch {}
      vad = null
    }
    audio.stop()
    await audio.listDevices()
    await audio.start()

    const { MicVAD } = await import('@ricky0123/vad-web')
    const microphoneConstraints = (): MediaStreamConstraints => ({
      audio: {
        channelCount: 1,
        echoCancellation: true,
        autoGainControl: true,
        noiseSuppression: true,
        ...(audio.selectedDeviceId.value ? { deviceId: { exact: audio.selectedDeviceId.value } } : {}),
      },
    })
    vad = await MicVAD.new({
      baseAssetPath: voicePath,
      model: 'v5',
      ortConfig: (ort) => {
        ort.env.wasm.wasmPaths = `https://cdn.jsdelivr.net/npm/onnxruntime-web@${ort.env.versions.web}/dist/`
        ort.env.wasm.numThreads = 1
        ort.env.wasm.proxy = false
      },
      getStream: () => audio.createStream(microphoneConstraints()),
      pauseStream: async (stream: MediaStream) => stream.getTracks().forEach(track => track.stop()),
      resumeStream: () => audio.createStream(microphoneConstraints()),
      positiveSpeechThreshold: 0.7,
      negativeSpeechThreshold: 0.35,
      minSpeechMs: 300,
      preSpeechPadMs: 800,
      redemptionMs: 1200,
      onSpeechRealStart: () => {
        if (!stopped && callbacks) callbacks.onSpeechStart()
      },
      onSpeechEnd: async (rawAudio: Float32Array) => {
        if (stopped || !callbacks) return
        if (vad) vad.pause()
        try {
          const txt = await asr.transcribe(rawAudio)
          if (stopped || !callbacks) return
          if (txt && txt.length > 1 && txt !== '.' && !txt.match(/^\[.*\]$/) && !txt.match(/^\(.*\)$/))
            callbacks.onSpeechEnd(txt)
          else
            callbacks.onSpeechEnd('')
        }
        catch {
          if (!stopped && callbacks) callbacks.onSpeechEnd('')
        }
      },
      onFrameProcessed: () => {},
    })
    vad.start()
  }

  async function start(cb: STTCallbacks): Promise<void> {
    callbacks = cb
    stopped = false
    const voicePath = new URL('./', import.meta.url).href
    if (!asr.loaded.value)
      await asr.load()
    await startVAD(voicePath)
  }

  async function switchDevice(deviceId: string): Promise<void> {
    audio.selectDevice(deviceId)
    if (!stopped && vad) {
      const voicePath = new URL('./', import.meta.url).href
      await startVAD(voicePath)
      if (!stopped) vad.start()
    }
  }

  function pause() {
    if (vad) vad.pause()
  }

  function resume() {
    if (vad) vad.start()
  }

  function stop() {
    stopped = true
    callbacks = null
    if (vad) {
      try { vad.pause() } catch {}
      try { vad.destroy() } catch {}
      vad = null
    }
    audio.stop()
  }

  function dispose() {
    stop()
    asr.dispose()
  }

  return {
    start, pause, resume, stop, dispose, switchDevice,
    get progress() { return asr.progress },
    get loaded() { return asr.loaded },
    get audio() { return audio },
  } as STTProvider & { progress: typeof asr.progress, loaded: typeof asr.loaded, audio: typeof audio, switchDevice: typeof switchDevice }
}
