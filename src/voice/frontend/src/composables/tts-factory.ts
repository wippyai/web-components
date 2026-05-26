import { ref, watch } from 'vue'
import type { TTSProvider, TTSConfig } from './tts-types'
import { createDeepgramTTS } from './tts-deepgram'
import { createElevenLabsTTS } from './tts-elevenlabs'
import { defaultConfig, type VoiceConfig } from './config'

export function useTTSManager(config: VoiceConfig = defaultConfig) {
  const enabled = ref(localStorage.getItem('voice-orb:tts') === 'true')
  const speaking = ref(false)

  let api: any = null
  let provider: TTSProvider | null = null
  let cachedConfig: TTSConfig | null = null
  let configPromise: Promise<TTSConfig | null> | null = null
  let speakingUnsub: (() => void) | null = null
  let connecting = false
  let pendingChunks: string[] = []
  let pendingFlush = false

  function setApi(a: any) { api = a }

  function toggle() {
    enabled.value = !enabled.value
    localStorage.setItem('voice-orb:tts', String(enabled.value))
    if (!enabled.value) stop()
  }

  async function fetchConfig(): Promise<TTSConfig | null> {
    if (!api) return null
    try {
      const { data } = await api.post(config.endpoints.ttsToken)
      if (!data.success || !data.tts) return null
      return {
        provider: data.tts.provider || 'deepgram',
        token: data.tts.token,
        voiceId: data.tts.voice_id,
        modelId: data.tts.model_id,
      }
    }
    catch {
      return null
    }
  }

  function prefetchToken() {
    if (!enabled.value) return
    if (cachedConfig) return
    configPromise = fetchConfig().then(c => { cachedConfig = c; configPromise = null; return c })
  }

  function bindSpeaking(p: TTSProvider) {
    if (speakingUnsub) { speakingUnsub(); speakingUnsub = null }
    speakingUnsub = watch(p.speaking, (val) => { speaking.value = val })
  }

  let stopped = false

  async function connect(): Promise<boolean> {
    if (!enabled.value || connecting) return false
    connecting = true
    stopped = false
    pendingChunks = []
    pendingFlush = false

    let ttsConfig: TTSConfig | null = null
    if (cachedConfig) {
      ttsConfig = cachedConfig
      cachedConfig = null
      configPromise = null
    }
    else if (configPromise) {
      ttsConfig = await configPromise
      configPromise = null
      cachedConfig = null
    }
    else {
      ttsConfig = await fetchConfig()
    }

    if (!ttsConfig || stopped) {
      connecting = false
      return false
    }

    if (provider) { provider.stop(); speakingUnsub?.() }

    provider = ttsConfig.provider === 'elevenlabs'
      ? createElevenLabsTTS(ttsConfig)
      : createDeepgramTTS(ttsConfig)

    bindSpeaking(provider)
    const ok = await provider.connect()
    connecting = false

    if (stopped) {
      if (provider) { provider.stop(); provider = null }
      return false
    }

    if (ok && provider) {
      for (const chunk of pendingChunks) provider.feedChunk(chunk)
      if (pendingFlush) provider.flush()
    }
    pendingChunks = []
    pendingFlush = false

    return ok
  }

  function feedChunk(text: string) {
    if (!text) return
    if (connecting) {
      pendingChunks.push(text)
      return
    }
    if (provider) provider.feedChunk(text)
  }

  function flush() {
    if (connecting) {
      pendingFlush = true
      return
    }
    if (provider) provider.flush()
  }

  function stop() {
    stopped = true
    connecting = false
    pendingChunks = []
    pendingFlush = false
    if (provider) { provider.stop(); provider = null }
    if (speakingUnsub) { speakingUnsub(); speakingUnsub = null }
    speaking.value = false
    cachedConfig = null
    configPromise = null
  }

  return { enabled, speaking, setApi, toggle, prefetchToken, connect, feedChunk, flush, stop }
}
