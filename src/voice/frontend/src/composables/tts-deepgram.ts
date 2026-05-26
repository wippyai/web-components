import type { TTSProvider, TTSConfig } from './tts-types'
import { createTTSAudio } from './tts-audio'

const CONNECT_TIMEOUT = 8000
const FLUSH_TIMEOUT = 5000
const SAMPLE_RATE = 24000

export function createDeepgramTTS(config: TTSConfig): TTSProvider {
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
      model: config.modelId,
      encoding: 'linear16',
      sample_rate: String(SAMPLE_RATE),
    })
    const url = `wss://api.deepgram.com/v1/speak?${params}`

    return new Promise<boolean>((resolve) => {
      ws = new WebSocket(url, ['token', config.token])
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
        connecting = false
        for (const chunk of pendingChunks) sendText(chunk)
        pendingChunks = []
        resolve(true)
      }

      ws.onmessage = (event) => {
        if (event.data instanceof ArrayBuffer) {
          if (event.data.byteLength > 0) audio.playBinaryPCM(event.data)
        }
        else {
          try {
            const msg = JSON.parse(event.data)
            if (msg.type === 'Flushed') audio.markFlushed()
          } catch {}
        }
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
    ws.send(JSON.stringify({ type: 'Speak', text: text + ' ' }))
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
      ws.send(JSON.stringify({ type: 'Flush' }))
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
    if (ws) {
      try { ws.send(JSON.stringify({ type: 'Close' })) } catch {}
      ws.close()
      ws = null
    }
    connecting = false
    pendingChunks = []
    audio.clear()
  }

  return { connect, feedChunk, flush, stop, speaking: audio.speaking }
}
