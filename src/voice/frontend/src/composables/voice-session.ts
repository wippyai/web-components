import { ref } from 'vue'
import type { PageContext } from './page-context'
import { defaultConfig, type VoiceConfig } from './config'

export interface VoiceAskPayload {
  text: string
  start_token?: string
  session_id?: string
  context?: PageContext
}

export interface VoiceAskResponse {
  success: boolean
  message_id?: string
  error?: string
}

export function useVoiceSession(config: VoiceConfig = defaultConfig) {
  const sessionId = ref<string | null>(null)
  const lastContext = ref<PageContext | null>(null)
  let api: any = null
  let startToken: string | null = null

  function setApi(a: any) { api = a }
  function setStartToken(token: string) { startToken = token }

  function clearSession() {
    sessionId.value = null
    lastContext.value = null
  }

  async function send(text: string, context: PageContext | null): Promise<VoiceAskResponse> {
    if (!api || !startToken)
      return { success: false, error: 'not initialized' }

    const payload: VoiceAskPayload = { text }

    if (sessionId.value)
      payload.session_id = sessionId.value
    else
      payload.start_token = startToken

    if (context) {
      const pageChanged = lastContext.value !== null && lastContext.value.page !== context.page

      const contextWithChange: PageContext = {
        ...context,
        agent_changed: pageChanged,
      }
      payload.context = contextWithChange
      lastContext.value = context
    }

    try {
      const { data } = await api.post(config.endpoints.ask, payload)
      if (data.success && data.message_id)
        return { success: true, message_id: data.message_id }
      return { success: false, error: data.error || 'unknown error' }
    }
    catch (e: any) {
      return { success: false, error: e.message }
    }
  }

  function onSessionOpened(id: string) {
    if (!sessionId.value)
      sessionId.value = id
  }

  function onPageAgentChanged() {
    // keep session_id for continuity — backend handles agent switch
  }

  return {
    sessionId,
    lastContext,
    setApi,
    setStartToken,
    clearSession,
    send,
    onSessionOpened,
    onPageAgentChanged,
  }
}
