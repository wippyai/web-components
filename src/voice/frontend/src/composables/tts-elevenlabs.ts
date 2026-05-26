import type { TTSProvider, TTSConfig } from './tts-types'
import { createTTSAudio } from './tts-audio'

const CONNECT_TIMEOUT = 8000
const FLUSH_TIMEOUT = 5000

export function createElevenLabsTTS(config: TTSConfig): TTSProvider {
  const audio = createTTSAudio()
  let ws: WebSocket | null = null
  let pendingChunks: string[] = []
  let connecting = false
  let connectTimer: ReturnType<typeof setTimeout> | null = null
  let flushTimer: ReturnType<typeof setTimeout> | null = null

  function clearTimers() {
    if (connectTimer) { clearTimeout(connectTimer); connectTimer = null }
    if (flushTimer) { clearTimeout(flushTimer); flushTimer = null }
  }

  async function connect(): Promise<boolean> {
    if (connecting) return false
    if (ws) { try { ws.close() } catch {} ws = null }
    audio.clear()
    clearTimers()
    connecting = true
    pendingChunks = []

    audio.ensureCtx()
    audio.reset()

    const params = new URLSearchParams({
      single_use_token: config.token,
      model_id: config.modelId,
      output_format: 'pcm_24000',
    })
    const url = `wss://api.elevenlabs.io/v1/text-to-speech/${config.voiceId}/stream-input?${params}`

    return new Promise<boolean>((resolve) => {
      ws = new WebSocket(url)
      ws.binaryType = 'arraybuffer'

      connectTimer = setTimeout(() => {
        if (connecting) {
          connecting = false
          if (ws) { try { ws.close() } catch {} ws = null }
          resolve(false)
        }
      }, CONNECT_TIMEOUT)

      ws.onopen = () => {
        clearTimeout(connectTimer!)
        connectTimer = null

        ws!.send(JSON.stringify({
          text: ' ',
          voice_settings: { stability: 0.5, similarity_boost: 0.75 },
          generation_config: { chunk_length_schedule: [120, 160, 250, 290] },
        }))

        connecting = false
        for (const chunk of pendingChunks) sendText(chunk)
        pendingChunks = []
        resolve(true)
      }

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data)
          if (msg.audio) audio.playBase64PCM(msg.audio)
          if (msg.isFinal) audio.markFlushed()
        } catch {}
      }

      ws.onerror = () => {
        clearTimers()
        connecting = false
        ws = null
        resolve(false)
      }

      ws.onclose = () => {
        clearTimers()
        connecting = false
        ws = null
      }
    })
  }

  function sendText(text: string) {
    if (!ws || ws.readyState !== WebSocket.OPEN) return
    ws.send(JSON.stringify({ text: text + ' ' }))
  }

  function feedChunk(text: string) {
    if (!text) return
    if (connecting) { pendingChunks.push(text); return }
    sendText(text)
  }

  function flush() {
    clearTimeout(flushTimer!)

    const doFlush = () => {
      if (!ws || ws.readyState !== WebSocket.OPEN) {
        audio.markFlushed()
        return
      }
      ws.send(JSON.stringify({ flush: true }))
      flushTimer = setTimeout(() => audio.markFlushed(), FLUSH_TIMEOUT)
    }

    if (connecting) {
      let attempts = 0
      const poll = () => {
        if (++attempts > 100) { audio.markFlushed(); return }
        if (!connecting && ws && ws.readyState === WebSocket.OPEN) doFlush()
        else if (connecting) setTimeout(poll, 50)
        else audio.markFlushed()
      }
      setTimeout(poll, 50)
      return
    }
    doFlush()
  }

  function stop() {
    clearTimers()
    if (ws) { ws.close(); ws = null }
    connecting = false
    pendingChunks = []
    audio.clear()
  }

  return { connect, feedChunk, flush, stop, speaking: audio.speaking }
}
