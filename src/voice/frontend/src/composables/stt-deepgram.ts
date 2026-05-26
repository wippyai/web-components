import type { STTProvider, STTCallbacks } from './stt-types'
import { useAudio } from './use-audio'

const CONNECT_TIMEOUT = 10000

export function createDeepgramSTT(token: string): STTProvider {
  const audio = useAudio()
  let ws: WebSocket | null = null
  let audioCtx: AudioContext | null = null
  let processor: ScriptProcessorNode | null = null
  let source: MediaStreamAudioSourceNode | null = null
  let mediaStream: MediaStream | null = null
  let callbacks: STTCallbacks | null = null
  let currentTranscript = ''
  let speaking = false
  let stopped = false

  async function connectWS(): Promise<void> {
    const params = new URLSearchParams({
      model: 'nova-3',
      language: 'en',
      encoding: 'linear16',
      sample_rate: '16000',
      channels: '1',
      punctuate: 'true',
      interim_results: 'true',
      endpointing: '300',
      vad_events: 'true',
      smart_format: 'true',
      utterance_end_ms: '1200',
    })

    const url = `wss://api.deepgram.com/v1/listen?${params}`
    ws = new WebSocket(url, ['token', token])

    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => {
        if (ws) { ws.close(); ws = null }
        reject(new Error('Deepgram connection timeout'))
      }, CONNECT_TIMEOUT)

      ws!.onopen = () => {
        clearTimeout(timer)
        resolve()
      }

      ws!.onmessage = (event) => {
        try { handleMessage(JSON.parse(event.data)) } catch {}
      }

      ws!.onerror = () => {
        clearTimeout(timer)
        reject(new Error('Deepgram connection failed'))
      }

      ws!.onclose = () => {
        clearTimeout(timer)
        ws = null
      }
    })
  }

  async function start(cb: STTCallbacks): Promise<void> {
    callbacks = cb
    stopped = false
    currentTranscript = ''
    speaking = false

    await audio.listDevices()
    await audio.start()

    mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true },
    })

    await connectWS()
    startAudioCapture()
  }

  function handleMessage(msg: any) {
    if (stopped || !callbacks) return

    if (msg.type === 'SpeechStarted') {
      if (!speaking) {
        speaking = true
        currentTranscript = ''
        callbacks.onSpeechStart()
      }
      return
    }

    if (msg.type === 'Results') {
      const alt = msg.channel?.alternatives?.[0]
      if (!alt) return
      const text = alt.transcript || ''

      if (msg.is_final && text)
        currentTranscript += (currentTranscript ? ' ' : '') + text

      if (callbacks.onInterim && (text || currentTranscript)) {
        const interim = msg.is_final
          ? currentTranscript
          : currentTranscript + (currentTranscript ? ' ' : '') + text
        callbacks.onInterim(interim)
      }
      return
    }

    if (msg.type === 'UtteranceEnd') {
      if (speaking && currentTranscript) {
        speaking = false
        callbacks.onSpeechEnd(currentTranscript)
        currentTranscript = ''
      }
      else {
        speaking = false
      }
      return
    }
  }

  function startAudioCapture() {
    if (!mediaStream || !ws) return
    if (!audioCtx)
      audioCtx = new AudioContext({ sampleRate: 16000 })
    if (!source)
      source = audioCtx.createMediaStreamSource(mediaStream)
    if (!processor) {
      processor = audioCtx.createScriptProcessor(4096, 1, 1)
      source.connect(processor)
      processor.connect(audioCtx.destination)
    }
    attachProcessor()
  }

  function attachProcessor() {
    if (!processor) return
    processor.onaudioprocess = (e) => {
      if (!ws || ws.readyState !== WebSocket.OPEN) return
      const float32 = e.inputBuffer.getChannelData(0)
      const int16 = new Int16Array(float32.length)
      for (let i = 0; i < float32.length; i++)
        int16[i] = Math.max(-32768, Math.min(32767, float32[i] * 32768))
      ws.send(int16.buffer)
    }
  }

  function pause() {
    if (processor) processor.onaudioprocess = null
  }

  async function resume() {
    if (ws && ws.readyState === WebSocket.OPEN) {
      attachProcessor()
      return
    }

    if (stopped) return
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        await connectWS()
        attachProcessor()
        return
      }
      catch {
        if (stopped) return
        if (attempt < 2)
          await new Promise(r => setTimeout(r, 1000 * (attempt + 1)))
      }
    }
    if (callbacks) callbacks.onSpeechEnd('')
  }

  function stop() {
    stopped = true
    callbacks = null
    speaking = false
    currentTranscript = ''

    if (ws) {
      try { ws.send(JSON.stringify({ type: 'CloseStream' })) } catch {}
      ws.close()
      ws = null
    }
    if (processor) { processor.disconnect(); processor = null }
    if (source) { source.disconnect(); source = null }
    if (audioCtx) { audioCtx.close(); audioCtx = null }
    if (mediaStream) {
      mediaStream.getTracks().forEach(t => t.stop())
      mediaStream = null
    }
    audio.stop()
  }

  function dispose() { stop() }

  return {
    start, pause, resume, stop, dispose,
    get audio() { return audio },
  } as STTProvider & { audio: typeof audio }
}
