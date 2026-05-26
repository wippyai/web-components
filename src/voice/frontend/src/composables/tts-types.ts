import type { Ref } from 'vue'

export interface TTSProvider {
  connect(): Promise<boolean>
  feedChunk(text: string): void
  flush(): void
  stop(): void
  readonly speaking: Ref<boolean>
}

export interface TTSConfig {
  provider: 'elevenlabs' | 'deepgram'
  token: string
  voiceId?: string
  modelId: string
}
