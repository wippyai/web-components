import type { STTProvider, STTCallbacks } from './stt-types'
import { useTranscriber } from './use-transcriber'
import { useAudio } from './use-audio'
import { defaultConfig, type VoiceConfig } from './config'

export function createWhisperSTT(config: VoiceConfig = defaultConfig): STTProvider {
  const asr = useTranscriber('onnx-community/whisper-base')
  const audio = useAudio()
  let vad: any = null
  let callbacks: STTCallbacks | null = null
  let stopped = false

  async function start(cb: STTCallbacks): Promise<void> {
    callbacks = cb
    stopped = false

    const base = new URL(document.baseURI).origin
    const voicePath = base + config.whisperBasePath
    if (!asr.loaded.value)
      await asr.load(voicePath)

    await audio.listDevices()
    await audio.start()

    const { MicVAD } = await import('@ricky0123/vad-web')
    vad = await MicVAD.new({
      workletURL: voicePath + 'vad.worklet.bundle.min.js',
      modelURL: voicePath + 'silero_vad.onnx',
      ortConfig: (ort: any) => {
        ort.env.wasm.wasmPaths = voicePath
        ort.env.wasm.numThreads = 1
        ort.env.wasm.proxy = false
      },
      positiveSpeechThreshold: 0.7,
      negativeSpeechThreshold: 0.35,
      minSpeechFrames: 3,
      preSpeechPadFrames: 8,
      redemptionFrames: 12,
      onSpeechStart: () => {
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
    start, pause, resume, stop, dispose,
    get progress() { return asr.progress },
    get loaded() { return asr.loaded },
    get audio() { return audio },
  } as STTProvider & { progress: typeof asr.progress, loaded: typeof asr.loaded, audio: typeof audio }
}
