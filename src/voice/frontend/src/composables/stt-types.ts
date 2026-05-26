export interface STTCallbacks {
  onSpeechStart: () => void
  onSpeechEnd: (text: string) => void
  onInterim?: (text: string) => void
}

export interface STTProvider {
  start(callbacks: STTCallbacks): Promise<void>
  pause(): void
  resume(): void | Promise<void>
  stop(): void
  dispose(): void
}
