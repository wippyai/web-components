import { ref } from 'vue'

const SAMPLE_RATE = 24000

export function createTTSAudio() {
  const speaking = ref(false)

  let audioCtx: AudioContext | null = null
  let nextPlayTime = 0
  let activeSourceCount = 0
  let activeSources: AudioBufferSourceNode[] = []
  let flushed = false

  function ensureCtx() {
    if (!audioCtx) audioCtx = new AudioContext()
    if (audioCtx.state === 'suspended') audioCtx.resume()
    return audioCtx
  }

  function checkDone() {
    if (activeSourceCount <= 0 && flushed)
      speaking.value = false
  }

  function schedule(float32: Float32Array) {
    const ctx = ensureCtx()
    const buffer = ctx.createBuffer(1, float32.length, SAMPLE_RATE)
    buffer.getChannelData(0).set(float32)

    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.connect(ctx.destination)

    const now = ctx.currentTime
    if (nextPlayTime < now) nextPlayTime = now
    source.start(nextPlayTime)
    nextPlayTime += buffer.duration

    activeSourceCount++
    activeSources.push(source)
    speaking.value = true

    source.onended = () => {
      activeSourceCount--
      const idx = activeSources.indexOf(source)
      if (idx >= 0) activeSources.splice(idx, 1)
      if (activeSourceCount <= 0) {
        activeSourceCount = 0
        checkDone()
      }
    }
  }

  function playBase64PCM(base64: string) {
    const raw = atob(base64)
    const bytes = new Uint8Array(raw.length)
    for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i)
    const int16 = new Int16Array(bytes.buffer)
    const float32 = new Float32Array(int16.length)
    for (let i = 0; i < int16.length; i++) float32[i] = int16[i] / 32768
    schedule(float32)
  }

  function playBinaryPCM(data: ArrayBuffer) {
    const int16 = new Int16Array(data)
    const float32 = new Float32Array(int16.length)
    for (let i = 0; i < int16.length; i++) float32[i] = int16[i] / 32768
    schedule(float32)
  }

  function markFlushed() {
    flushed = true
    checkDone()
  }

  function reset() {
    flushed = false
    nextPlayTime = 0
    activeSourceCount = 0
    activeSources = []
  }

  function clear() {
    for (const s of activeSources) {
      try { s.stop(); s.disconnect() } catch {}
    }
    activeSources = []
    activeSourceCount = 0
    nextPlayTime = 0
    flushed = false
    speaking.value = false
  }

  return { speaking, ensureCtx, playBase64PCM, playBinaryPCM, markFlushed, reset, clear }
}
