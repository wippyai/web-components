// voice orb configuration — all external paths and settings in one place
// no domain knowledge, just infrastructure endpoints

export interface VoiceConfig {
  endpoints: {
    ask: string
    ttsToken: string
    pageMap: string
  }
  whisperBasePath: string
}

export const defaultConfig: VoiceConfig = {
  endpoints: {
    ask: '/api/v1/voice/ask',
    ttsToken: '/api/v1/voice/tts-token',
    pageMap: '/api/v1/voice/pages',
  },
  whisperBasePath: '/voice/',
}
