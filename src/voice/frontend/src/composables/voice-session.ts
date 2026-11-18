import { ref } from 'vue'
import type { PageContext } from './page-context'
import { defaultConfig, type VoiceConfig } from './config'

export interface VoiceAskPayload {
  text: string
  file_uuids?: string[]
  start_token?: string
  route_by_page?: false
  session_id?: string
  context?: PageContext
  context_attachments_ref?: ContextAttachmentsReference
  runtime_context?: { ui_action_intent_nonce: string }
  request_id?: string
}

export interface VoiceAskResponse {
  success: boolean
  message_id?: string
  error?: string
}

export interface ContextAttachmentsReference {
  version: 1
  id: string
  content_hash: `sha256:${string}`
  content_bytes: number
}

export interface AttentionComposerDraftFile {
  id: string
  uuid?: string
  filename: string
  mime_type: string
  size: number
  status: 'uploading' | 'ready' | 'error'
}

export interface AttentionComposerDraftRegistration {
  update: (sessionId?: string, visible?: boolean) => void
  remove: (id: string) => Promise<void>
  commit: (uuids: string[]) => void
  dispose: () => void
}

export interface AttentionMessageContextApi {
  enabled: boolean
  supports: (feature: 'message-context' | 'agent-actions') => boolean
  prepareMessageContext?: (input: {
    requestId: string
    text: string
    sessionId?: string
    startToken?: string
    attentionContextEnabled?: boolean
  }) => Promise<{
    session_id: string
    attention_context: {
      enabled: boolean
      revision: number
    }
    context_attachments_ref?: ContextAttachmentsReference
    ui_action_intent_nonce?: string
  } | null>
  registerComposerDrafts?: (request: {
    sessionId?: string
    visible?: boolean
    onChange: (files: AttentionComposerDraftFile[]) => void
  }) => AttentionComposerDraftRegistration
}

export interface AttentionSessionState {
  enabled: boolean
  revision: number
}

function createRequestId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function')
    return crypto.randomUUID()
  return 'voice-request-' + Date.now() + '-' + Math.random().toString(36).slice(2)
}

export function useVoiceSession(config: VoiceConfig = defaultConfig) {
  const sessionId = ref<string | null>(null)
  const lastContext = ref<PageContext | null>(null)
  const attentionContext = ref<AttentionSessionState | null>(null)
  let api: any = null
  let attention: AttentionMessageContextApi | null = null
  let startToken: string | null = null
  let routeByPage = true
  let pendingSessionRequestId: string | null = null

  function setApi(a: any) { api = a }
  function setAttention(a: AttentionMessageContextApi | null) { attention = a }
  function setStartToken(token: string | null, usePageAgent = true) {
    startToken = token
    routeByPage = usePageAgent
  }

  function sendFailure(error: string): VoiceAskResponse {
    pendingSessionRequestId = null
    return { success: false, error }
  }

  function clearSession() {
    sessionId.value = null
    lastContext.value = null
    attentionContext.value = null
    pendingSessionRequestId = null
  }

  async function send(text: string, context: PageContext | null, attentionContextEnabled = false, fileUuids: string[] = []): Promise<VoiceAskResponse> {
    if (!api || !startToken)
      return { success: false, error: 'not initialized' }

    const requestId = createRequestId()
    if (!sessionId.value)
      pendingSessionRequestId = requestId
    let contextAttachmentsRef: ContextAttachmentsReference | null = null
    let uiActionIntentNonce: string | null = null
    const messageContextAvailable = attention?.enabled === true && attention.supports('message-context')
    const agentActionsAvailable = attention?.enabled === true && attention.supports('agent-actions')
    const prepareMessageContext = attention?.prepareMessageContext

    if (attentionContextEnabled && (!messageContextAvailable || !prepareMessageContext))
      return sendFailure('Attention context is unavailable')

    if (messageContextAvailable || agentActionsAvailable) {
      if (!prepareMessageContext)
        return sendFailure('Attention turn preparation is unavailable')
      let prepared: Awaited<ReturnType<typeof prepareMessageContext>>
      try {
        prepared = await prepareMessageContext({
          requestId,
          text,
          sessionId: sessionId.value || undefined,
          startToken: startToken || undefined,
          ...(attentionContextEnabled ? { attentionContextEnabled: true } : {}),
        })
      }
      catch (e: any) {
        return sendFailure('Attention context preparation failed: ' + (e?.message || e))
      }
      if (!prepared?.session_id || !prepared.attention_context)
        return sendFailure('Attention context preparation returned an invalid session result')
      attentionContext.value = prepared.attention_context
      if (attentionContextEnabled && prepared.attention_context.enabled !== true)
        return sendFailure('Attention context preparation returned disabled state')
      sessionId.value = prepared.session_id
      pendingSessionRequestId = null
      if (prepared.ui_action_intent_nonce)
        uiActionIntentNonce = prepared.ui_action_intent_nonce
      if (prepared.attention_context.enabled && messageContextAvailable) {
        if (!prepared.context_attachments_ref)
          return sendFailure('Attention context preparation returned no reference')
        contextAttachmentsRef = prepared.context_attachments_ref
      }
    }

    const payload: VoiceAskPayload = {
      text,
      request_id: requestId,
    }
    if (fileUuids.length > 0)
      payload.file_uuids = [...new Set(fileUuids)]
    if (contextAttachmentsRef)
      payload.context_attachments_ref = contextAttachmentsRef
    if (uiActionIntentNonce)
      payload.runtime_context = { ui_action_intent_nonce: uiActionIntentNonce }

    if (sessionId.value)
      payload.session_id = sessionId.value
    else
      payload.start_token = startToken

    if (!routeByPage)
      payload.route_by_page = false

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
      return sendFailure(data.error || 'unknown error')
    }
    catch (e: any) {
      return sendFailure(e.message)
    }
  }

  function onSessionOpened(id: string, requestId?: string) {
    if (requestId !== pendingSessionRequestId) return
    if (!sessionId.value)
      sessionId.value = id
    pendingSessionRequestId = null
  }

  function onPageAgentChanged() {
    // keep session_id for continuity — backend handles agent switch
  }

  function onAttentionContextUpdated(id: string, state: AttentionSessionState) {
    if (id !== sessionId.value
      || typeof state?.enabled !== 'boolean'
      || !Number.isInteger(state?.revision)
      || state.revision < 0
      || (attentionContext.value && state.revision < attentionContext.value.revision))
      return
    attentionContext.value = state
  }

  return {
    sessionId,
    lastContext,
    attentionContext,
    setApi,
    setAttention,
    setStartToken,
    clearSession,
    send,
    onSessionOpened,
    onPageAgentChanged,
    onAttentionContextUpdated,
  }
}
