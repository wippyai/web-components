<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import MarkdownIt from 'markdown-it'
import { useAudio } from '../composables/use-audio'
import { useOrb } from '../composables/use-orb'
import { useTTSManager } from '../composables/tts-factory'
import { useVoiceSession } from '../composables/voice-session'
import { usePageContext } from '../composables/page-context'
import { useFeed } from '../composables/use-feed'
import type { STTProvider, STTCallbacks } from '../composables/stt-types'
import { defaultConfig } from '../composables/config'

const md = new MarkdownIt({ html: false, linkify: true, breaks: true })
function renderMd(text: string): string {
  return md.render(text)
}

// ---- refs ----

const orbRingRef = ref<SVGPathElement | null>(null)
const orbFillRef = ref<SVGPathElement | null>(null)
const feedEl = ref<HTMLElement | null>(null)

// ---- state machine ----

type VoiceState = 'idle' | 'loading' | 'listening' | 'capturing' | 'processing' | 'responding' | 'speaking' | 'error'
const state = ref<VoiceState>('idle')
const statusText = ref('')

// Tool call tracking
let toolFeedId: string | null = null
let toolNames: string[] = []

let audioCtx: AudioContext | null = null
function playToolTick() {
  try {
    if (!audioCtx) audioCtx = new AudioContext()
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    osc.connect(gain)
    gain.connect(audioCtx.destination)
    osc.frequency.value = 880
    gain.gain.setValueAtTime(0.03, audioCtx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08)
    osc.start(audioCtx.currentTime)
    osc.stop(audioCtx.currentTime + 0.08)
  } catch {}
}

const TOOL_TITLES: Record<string, string> = {
  AddRelation: 'Link Tables', AssessmentQuery: 'Query Assessment Data', BatchImport: 'Batch Import',
  ColumnProfile: 'Column Profile', CreateDatabase: 'New Database', CreateShape: 'Create Shape',
  CreateShapeGroup: 'New Schema Group', CrossColumnAnalysis: 'Cross Column Analysis',
  DeleteRelation: 'Remove Relationship', DeleteShape: 'Delete Schema',
  DiscoveryRead: 'Read Finding', DiscoverySave: 'Save Finding', DiscoverySearch: 'Search Findings',
  DryRunScript: 'Dry Run Script', ExecuteImportScript: 'Execute Import', ExecuteScript: 'Execute Script',
  FeedbackInsight: 'Rate Insight', FileStatistics: 'File Statistics', FindDataRange: 'Find Data Range',
  GenerateInsight: 'Generate Insight', GetScript: 'Get Script', InspectDataset: 'Inspect Dataset',
  InspectFile: 'Inspect File', InspectRows: 'Inspect Rows',
  KBList: 'Browse Knowledge', KBRead: 'Read Knowledge', KBSearch: 'Search Knowledge', KBWrite: 'Save Knowledge',
  ListDatasets: 'Browse Datasets', ListFiles: 'Browse Files', ListSchemas: 'Browse Schemas',
  ListScripts: 'Browse Scripts', ListShapeGroups: 'Browse Schema Groups',
  NavigateTo: 'Open Page', QueryData: 'Query Data', ReadDocument: 'Read Document',
  RedirectToAgent: 'Switch Assistant', RegexSearch: 'Regex Search',
  RunAssessment: 'Run Assessment', RunImportWorkflow: 'Run Import Workflow',
  SaveScript: 'Save Script', UpdateAssessmentStage: 'Update Assessment Stage', UpdateShape: 'Update Schema',
}

function toolTitle(name: string): string {
  return TOOL_TITLES[name] || name
}
const confirmMode = ref(localStorage.getItem('voice-orb:confirm') === 'true')
const pendingText = ref('')
const feedWidth = ref(parseInt(localStorage.getItem('voice-orb:fw') || '300'))
const feedHeight = ref(parseInt(localStorage.getItem('voice-orb:fh') || '220'))
const feedCollapsed = ref(localStorage.getItem('voice-orb:collapsed') === 'true')
const showMicPicker = ref(false)
const feed = useFeed(feedEl)

function toggleFeedCollapsed() {
  feedCollapsed.value = !feedCollapsed.value
  localStorage.setItem('voice-orb:collapsed', String(feedCollapsed.value))
}

async function toggleMicPicker() {
  if (showMicPicker.value) {
    showMicPicker.value = false
    return
  }
  // Use the STT's audio instance if active (already has device list), else enumerate via sharedAudio
  const activeAudio = (stt as any)?.audio
  if (activeAudio?.devices?.value?.length) {
    showMicPicker.value = true
  }
  else {
    await sharedAudio.listDevices()
    showMicPicker.value = true
  }
}

function pickMic(deviceId: string) {
  showMicPicker.value = false
  const activeAudio = (stt as any)?.audio
  if (activeAudio && typeof (stt as any).switchDevice === 'function') {
    ;(stt as any).switchDevice(deviceId)
  }
  else {
    sharedAudio.selectDevice(deviceId)
  }
}

// ---- composables ----

const currentPath = ref('/')
const sharedAudio = useAudio()
const orb = useOrb(orbRingRef, orbFillRef, () => sharedAudio.getAmplitude())
const tts = useTTSManager()
const voiceSession = useVoiceSession()
const pageCtx = usePageContext(currentPath)

// ---- providers ----

let stt: STTProvider | null = null
let api: any = null
let onSub: (() => void) | null = null
let onHistorySub: (() => void) | null = null
let currentFeedId: string | null = null
let liveUserFeedId: string | null = null
let responseTimeout: ReturnType<typeof setTimeout> | null = null
let speakingTimeout: ReturnType<typeof setTimeout> | null = null
let sessionRunning = false
let idleTimer: number | null = null
const RESPONSE_TIMEOUT = 30000
const SPEAKING_TIMEOUT = 60000
const TTS_CHECK_DELAY = 5000

// ---- state helpers ----

function isActive(): boolean {
  return state.value !== 'idle' && state.value !== 'error'
}

function transition(to: VoiceState) {
  const prev = state.value
  state.value = to
  console.debug('voice:transition', prev, '→', to)

  const sttActive = (s: VoiceState) => s === 'listening' || s === 'capturing' || s === 'responding'
  if (sttActive(prev) && !sttActive(to) && stt) {
    console.debug('voice:stt-pause', to)
    stt.pause()
  }

  const orbModes: Record<VoiceState, string> = {
    idle: 'idle', loading: 'processing', listening: 'listening',
    capturing: 'speaking', processing: 'processing',
    responding: 'processing', speaking: 'speaking', error: 'idle',
  }
  orb.setMode(orbModes[to] as any)
}

// ---- audio feedback ----

let acceptSoundCtx: AudioContext | null = null

function playAcceptSound() {
  try {
    if (!acceptSoundCtx || acceptSoundCtx.state === 'closed') acceptSoundCtx = new AudioContext()
    const ctx = acceptSoundCtx
    if (ctx.state === 'suspended') ctx.resume()
    const g = ctx.createGain()
    g.connect(ctx.destination)
    g.gain.setValueAtTime(0.06, ctx.currentTime)
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1)
    const o = ctx.createOscillator()
    o.type = 'sine'
    o.frequency.setValueAtTime(880, ctx.currentTime)
    o.connect(g)
    o.start(ctx.currentTime)
    o.stop(ctx.currentTime + 0.1)
  } catch {}
}

// ---- feed helpers ----

function addFeed(role: 'user' | 'agent' | 'system', text: string): string {
  return feed.add(role, text)
}

function updateFeed(id: string | null, text: string, streaming = true) {
  feed.update(id, text, streaming)
}

// ---- resize ----

function startResize(e: MouseEvent) {
  e.preventDefault()
  const startX = e.clientX, startY = e.clientY
  const startW = feedWidth.value, startH = feedHeight.value
  const onMove = (ev: MouseEvent) => {
    feedWidth.value = Math.max(200, Math.min(600, startW - (ev.clientX - startX)))
    feedHeight.value = Math.max(120, Math.min(600, startH - (ev.clientY - startY)))
  }
  const onUp = () => {
    localStorage.setItem('voice-orb:fw', String(feedWidth.value))
    localStorage.setItem('voice-orb:fh', String(feedHeight.value))
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onUp)
  }
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
}

// ---- confirm ----

function toggleConfirm() {
  confirmMode.value = !confirmMode.value
  localStorage.setItem('voice-orb:confirm', String(confirmMode.value))
}

function confirmSend() {
  if (!pendingText.value) return
  playAcceptSound()
  addFeed('user', pendingText.value)
  sendToAgent(pendingText.value)
  pendingText.value = ''
}

function cancelSend() {
  pendingText.value = ''
  goListening()
}

function clearFeed() { feed.clear() }

// ---- typing fallback ----

const typedText = ref('')

function sendTyped() {
  const text = typedText.value.trim()
  if (!text || !isActive()) return
  const s = state.value
  if (s === 'processing' || s === 'responding' || s === 'speaking') return
  typedText.value = ''
  addFeed('user', text)
  sendToAgent(text)
}

// ---- listening state ----

function goListening() {
  if (!isActive()) return
  console.debug('voice:goListening', 'from', state.value)
  clearSpeakingTimeout()
  transition('listening')
  statusText.value = ''
  if (stt) {
    console.debug('voice:stt-resume')
    stt.resume()
  }
}

// ---- timeouts ----

function clearResponseTimeout() {
  if (responseTimeout) { clearTimeout(responseTimeout); responseTimeout = null }
}

function clearSpeakingTimeout() {
  if (speakingTimeout) { clearTimeout(speakingTimeout); speakingTimeout = null }
}

function startResponseTimeout() {
  clearResponseTimeout()
  responseTimeout = setTimeout(() => {
    if (state.value === 'responding') {
      if (currentFeedId) {
        const item = feed.items.value.find(f => f.id === currentFeedId)
        if (item && !item.text) updateFeed(currentFeedId, 'No response', false)
        feed.unprotect(currentFeedId)
        currentFeedId = null
      }
      tts.stop()
      if (isActive()) goListening()
    }
  }, RESPONSE_TIMEOUT)
}

function startSpeakingTimeout() {
  clearSpeakingTimeout()
  const checkDelay = TTS_CHECK_DELAY
  speakingTimeout = setTimeout(() => {
    console.debug('voice:speaking-check', 'state:', state.value, 'tts.speaking:', tts.speaking.value)
    if (state.value === 'speaking' && !tts.speaking.value) {
      console.debug('voice:speaking-timeout-recover')
      tts.stop()
      if (isActive()) goListening()
      return
    }
    speakingTimeout = setTimeout(() => {
      if (state.value === 'speaking') {
        tts.stop()
        if (isActive()) goListening()
      }
    }, SPEAKING_TIMEOUT - checkDelay)
  }, checkDelay)
}

// ---- agent ----

async function initVoice() {
  if (!api) return
  try {
    const { data } = await api.get(defaultConfig.endpoints.pageMap)
    if (data.success) {
      if (data.start_token) voiceSession.setStartToken(data.start_token)
      if (data.pages) pageCtx.pageMap.value = data.pages
    }
  } catch (e: any) {
    console.error('Voice init failed:', e?.message || e)
  }
}

// ---- STT callbacks ----

const sttCallbacks: STTCallbacks = {
  onSpeechStart() {
    const s = state.value
    if (s !== 'listening' && s !== 'responding') return

    if (s === 'responding') {
      if (currentFeedId) {
        feed.finalize(currentFeedId)
        currentFeedId = null
      }
      clearResponseTimeout()
    }
    transition('capturing')
  },

  onSpeechEnd(text: string) {
    if (state.value !== 'capturing') return

    transition('processing')
    playAcceptSound()
    orb.collapse(() => orb.setMode('processing'))

    if (text && text.length > 0) {
      if (liveUserFeedId) {
        updateFeed(liveUserFeedId, text, false)
        feed.unprotect(liveUserFeedId)
        liveUserFeedId = null
      }

      if (confirmMode.value) {
        pendingText.value = text
        statusText.value = 'confirm?'
      }
      else {
        if (!feed.items.value.find(f => f.role === 'user' && f.text === text))
          addFeed('user', text)
        sendToAgent(text)
      }
    }
    else {
      if (liveUserFeedId) {
        feed.items.value = feed.items.value.filter(f => f.id !== liveUserFeedId)
        feed.unprotect(liveUserFeedId)
        liveUserFeedId = null
      }
      goListening()
    }
  },

  onInterim(text: string) {
    if (!text || state.value !== 'capturing') return
    if (!liveUserFeedId) {
      liveUserFeedId = addFeed('user', text)
      feed.protect(liveUserFeedId)
      const item = feed.items.value.find(f => f.id === liveUserFeedId)
      if (item) item.streaming = true
    }
    else {
      updateFeed(liveUserFeedId, text, true)
    }
  },
}

// ---- send to agent ----

async function sendToAgent(text: string) {
  if (!isActive()) return

  currentFeedId = null
  sessionRunning = false
  transition('responding')

  if (tts.enabled.value) {
    tts.prefetchToken()
    tts.connect()
  }

  startResponseTimeout()

  try {
    const result = await voiceSession.send(text, pageCtx.current.value)

    if (!result.success) {
      clearResponseTimeout()
      if (!currentFeedId) {
        const eid = addFeed('agent', result.error || 'error')
        feed.finalize(eid)
      }
      else {
        updateFeed(currentFeedId, result.error || 'error', false)
        feed.finalize(currentFeedId)
      }
      currentFeedId = null
      tts.stop()
      if (isActive() && state.value !== 'capturing') goListening()
    }
  }
  catch (e: any) {
    clearResponseTimeout()
    if (!currentFeedId) {
      const eid = addFeed('agent', e.message || 'error')
      feed.finalize(eid)
    }
    else {
      updateFeed(currentFeedId, e.message || 'error', false)
      feed.finalize(currentFeedId)
    }
    currentFeedId = null
    tts.stop()
    if (isActive() && state.value !== 'capturing') goListening()
  }
}

// ---- websocket ----

function handleWsMessage(msg: any) {
  if (!msg) return
  const topic = (msg.topic || '') as string
  const data = msg.data

  if (topic === 'session.opened' && data?.session_id)
    voiceSession.onSessionOpened(data.session_id)

  if (data?.success === false && data?.message && currentFeedId) {
    clearResponseTimeout()
    updateFeed(currentFeedId, data.message, false)
    feed.finalize(currentFeedId)
    currentFeedId = null
    tts.stop()
    const s = state.value
    if (isActive() && s !== 'capturing' && s !== 'processing') goListening()
    return
  }

  if (topic.includes(':message:') && data) {
    if (data.type === 'function_call') {
      if (idleTimer) { clearTimeout(idleTimer); idleTimer = null }
      sessionRunning = true
      playToolTick()
      const title = toolTitle(data.function_name || '')
      toolNames.push(title)
      if (!toolFeedId) {
        toolFeedId = feed.add('system', toolNames.join(', '))
        feed.protect(toolFeedId)
      }
      else {
        feed.update(toolFeedId, toolNames.join(', '), true)
      }
      if (state.value === 'listening' || state.value === 'idle')
        transition('responding')
      return
    }
    if (data.type === 'function_success' || data.type === 'function_error') {
      if (idleTimer) { clearTimeout(idleTimer); idleTimer = null }
      sessionRunning = true
      return
    }

    if (toolFeedId && (data.type === 'chunk' || data.type === 'content')) {
      feed.update(toolFeedId, toolNames.join(', '), false)
      feed.unprotect(toolFeedId)
      toolFeedId = null
      toolNames = []
      currentFeedId = null
    }

    if (!currentFeedId && (data.type === 'chunk' || data.type === 'content')) {
      const feedId = addFeed('agent', '')
      feed.protect(feedId)
      currentFeedId = feedId
    }

    if (!currentFeedId) return
    clearResponseTimeout()

    if (data.type === 'chunk' && data.content) {
      const last = feed.items.value.find(f => f.id === currentFeedId)
      const current = last?.text || ''
      updateFeed(currentFeedId, current + data.content, true)
      if (tts.enabled.value) {
        tts.feedChunk(data.content)
        if (tts.speaking.value && state.value === 'responding') {
          transition('speaking')
          startSpeakingTimeout()
        }
      }
    }
    else if (data.type === 'content') {
      console.debug('voice:ws-content', 'state:', state.value, 'tts:', tts.enabled.value)
      const last = feed.items.value.find(f => f.id === currentFeedId)
      const current = last?.text || ''
      const finalText = current ? current + data.content : data.content
      updateFeed(currentFeedId, finalText, false)
      feed.unprotect(currentFeedId)
      currentFeedId = null
      if (tts.enabled.value) {
        tts.feedChunk(data.content)
        tts.flush()
        transition('speaking')
        startSpeakingTimeout()
      }
      else {
        if (isActive()) goListening()
      }
    }
  }

  if (topic.startsWith('session:') && !topic.includes(':message:')) {
    if (data?.type === 'error' && data?.message && currentFeedId) {
      clearResponseTimeout()
      updateFeed(currentFeedId, data.message, false)
      feed.finalize(currentFeedId)
      currentFeedId = null
      tts.stop()
      if (isActive()) goListening()
      return
    }

    if (data?.status === 'running') {
      sessionRunning = true
      if (idleTimer) { clearTimeout(idleTimer); idleTimer = null }
      console.debug('voice:session-running')
    }
    if (data?.status === 'idle' && sessionRunning) {
      console.debug('voice:session-idle', 'state:', state.value, 'tts.speaking:', tts.speaking.value)
      if (idleTimer) clearTimeout(idleTimer)
      idleTimer = window.setTimeout(() => {
        if (!sessionRunning) return
        sessionRunning = false
        if (toolFeedId) {
          feed.update(toolFeedId, toolNames.join(', '), false)
          feed.unprotect(toolFeedId)
          toolFeedId = null
          toolNames = []
        }
        clearResponseTimeout()
        if (currentFeedId) {
          const item = feed.items.value.find(f => f.id === currentFeedId)
          if (item) item.streaming = false
          feed.unprotect(currentFeedId)
          currentFeedId = null
        }
        if (state.value === 'speaking' && !tts.speaking.value) {
          if (isActive()) goListening()
        }
        else if (!tts.speaking.value && isActive() && state.value !== 'capturing' && state.value !== 'speaking') {
          goListening()
        }
      }, 800)
    }
  }
}

// ---- TTS completion ----

watch(tts.speaking, (isSpeaking, wasSpeaking) => {
  console.debug('voice:tts.speaking', wasSpeaking, '→', isSpeaking, 'state:', state.value)
  if (wasSpeaking && !isSpeaking) {
    clearSpeakingTimeout()
    const s = state.value
    if (isActive() && (s === 'speaking' || s === 'responding'))
      goListening()
    else
      console.debug('voice:tts-done-no-action', 'state:', s)
  }
})

// ---- start / stop ----

async function toggle() {
  if (state.value === 'speaking') {
    tts.stop()
    clearSpeakingTimeout()
    goListening()
  }
  else if (isActive()) {
    stop()
  }
  else {
    await start()
  }
}

async function start() {
  transition('loading')
  statusText.value = 'loading...'

  try {
    let sttProvider: 'whisper' | 'deepgram' = 'whisper'
    let sttToken = ''

    if (api) {
      try {
        const { data } = await api.post(defaultConfig.endpoints.ttsToken)
        if (data.success && data.stt?.provider === 'deepgram' && data.stt?.token) {
          sttProvider = 'deepgram'
          sttToken = data.stt.token
        }
      } catch (e: any) {
        console.error('STT config fetch failed:', e?.message || e)
      }
    }

    if (sttProvider === 'deepgram') {
      const { createDeepgramSTT } = await import('../composables/stt-deepgram')
      stt = createDeepgramSTT(sttToken)
    }
    else {
      const { createWhisperSTT } = await import('../composables/stt-whisper')
      const whisperStt = createWhisperSTT()
      stt = whisperStt

      const prog = (whisperStt as any).progress
      if (prog) {
        const interval = setInterval(() => {
          if (prog.value) statusText.value = `${Math.round(prog.value)}%`
        }, 200)
        try {
          await stt.start(sttCallbacks)
        } finally {
          clearInterval(interval)
        }
        tts.prefetchToken()
        goListening()
        return
      }
    }

    await stt.start(sttCallbacks)

    if (sttProvider !== 'whisper') {
      try {
        await sharedAudio.listDevices()
        await sharedAudio.start()
      } catch {}
    }

    tts.prefetchToken()
    goListening()
  } catch (e: any) {
    state.value = 'error'
    statusText.value = e.message
    orb.setMode('idle')
  }
}

function stop() {
  clearResponseTimeout()
  clearSpeakingTimeout()
  state.value = 'idle'

  if (stt) { stt.stop(); stt = null }
  sharedAudio.stop()
  tts.stop()
  orb.setMode('idle')
  statusText.value = ''
  pendingText.value = ''
  typedText.value = ''
  feed.unprotect(currentFeedId)
  feed.unprotect(liveUserFeedId)
  currentFeedId = null
  liveUserFeedId = null
  sessionRunning = false
}

// ---- lifecycle ----

let mounted = false

onMounted(async () => {
  if (mounted) return
  mounted = true
  try {
    const proxy = await import('@wippy-fe/proxy')
    api = proxy.api
    tts.setApi(api)
    voiceSession.setApi(api)
    onSub = proxy.on('@message', handleWsMessage) as any
    onHistorySub = proxy.on('@history', (e: any) => {
      if (e?.path) currentPath.value = e.path
    }) as any
    await initVoice()
  } catch (e: any) {
    console.error('VoiceOrb mount failed:', e)
  }
})

onUnmounted(() => {
  stop()
  if (onSub) { onSub(); onSub = null }
  if (onHistorySub) { onHistorySub(); onHistorySub = null }
})
</script>

<template>
  <div class="flex flex-col items-end gap-1">
    <!-- feed -->
    <div
      v-if="feed.items.value.length && !feedCollapsed"
      ref="feedEl"
      class="vo-feed relative overflow-y-auto flex flex-col gap-1 px-2 pt-3.5 pb-2"
      :style="{ width: feedWidth + 'px', maxHeight: feedHeight + 'px' }"
    >
      <div
        class="vo-resize-handle absolute top-0 left-0 w-4 h-4 cursor-nw-resize z-[3]"
        @mousedown="startResize"
      />
      <div class="vo-feed-actions absolute top-0.5 right-1 flex gap-0.5">
        <button
          title="Collapse"
          @click="toggleFeedCollapsed"
        >
          &#x2500;
        </button>
        <button
          title="Clear"
          @click="clearFeed"
        >
          &#x2715;
        </button>
      </div>
      <div
        v-for="item in feed.items.value"
        :key="item.id"
        class="vo-msg flex shrink-0"
        :class="[item.role, { streaming: item.streaming }]"
      >
        <div
          v-if="item.role === 'user'"
          class="vo-bubble vo-bubble-user text-[11px] font-normal leading-normal px-[9px] py-[5px] rounded-lg max-w-[85%] break-words"
        >
          {{ item.text }}
        </div>
        <div
          v-else-if="item.role === 'agent'"
          class="vo-bubble vo-bubble-agent text-[11px] font-normal leading-normal px-[9px] py-[5px] rounded-lg max-w-[85%] break-words"
          :class="{ streaming: item.streaming }"
          v-html="renderMd(item.text)"
        />
        <div
          v-else
          class="vo-bubble vo-bubble-system"
        >
          {{ item.text }}
        </div>
      </div>
    </div>

    <!-- collapsed feed indicator -->
    <button
      v-else-if="feed.items.value.length && feedCollapsed"
      class="vo-feed-collapsed flex items-center gap-1.5 px-2.5 py-1 rounded-lg cursor-pointer max-w-[300px]"
      :class="{ 'vo-feed-pulse': feed.items.value.some(f => f.streaming) }"
      :title="feed.items.value.length + ' messages — click to expand'"
      @click="toggleFeedCollapsed"
    >
      <span class="vo-feed-collapsed-count text-[9px] font-semibold px-[5px] py-px rounded-[3px] shrink-0">{{ feed.items.value.length }}</span>
      <span class="vo-feed-collapsed-preview text-[10px] overflow-hidden text-ellipsis whitespace-nowrap">{{ feed.items.value[feed.items.value.length - 1]?.text.substring(0, 40) }}{{ (feed.items.value[feed.items.value.length - 1]?.text.length || 0) > 40 ? '...' : '' }}</span>
    </button>

    <!-- confirm bar -->
    <div
      v-if="pendingText"
      class="vo-confirm flex items-center gap-1 px-2 py-1 rounded-lg max-w-[300px]"
    >
      <span class="vo-confirm-text flex-1 text-[11px] overflow-hidden text-ellipsis whitespace-nowrap">{{ pendingText }}</span>
      <button
        class="vo-confirm-btn send text-[9px] px-2 py-0.5 rounded font-medium"
        @click="confirmSend"
      >
        Send
      </button>
      <button
        class="vo-confirm-btn cancel text-[9px] px-2 py-0.5 rounded font-medium"
        @click="cancelSend"
      >
        X
      </button>
    </div>

    <!-- typing fallback -->
    <form
      v-if="isActive() && !pendingText"
      class="vo-type flex items-center gap-[3px] max-w-[300px]"
      @submit.prevent="sendTyped"
    >
      <input
        v-model="typedText"
        class="vo-type-input flex-1 h-[22px] rounded-[5px] text-[10px] px-1.5 outline-none"
        placeholder="Type a message..."
        :disabled="state === 'processing' || state === 'responding'"
      >
      <button
        type="submit"
        class="vo-type-send w-[22px] h-[22px] rounded-[5px] border-0 text-[11px] font-semibold cursor-pointer flex items-center justify-center p-0 shrink-0"
        :disabled="!typedText.trim()"
      >
        &#x2191;
      </button>
    </form>

    <!-- controls -->
    <div class="flex items-center gap-1.5">
      <span
        v-if="statusText"
        class="vo-status text-[8px] tracking-[0.3px] whitespace-nowrap"
        :class="state"
      >{{ statusText }}</span>

      <button
        v-if="state !== 'idle'"
        class="vo-mode-btn h-5 w-5 rounded text-[9px] font-semibold leading-none cursor-pointer flex items-center justify-center p-0 shrink-0 outline-none"
        :class="{ active: tts.enabled.value }"
        title="Text-to-speech"
        @click="tts.toggle"
      >
        S
      </button>

      <button
        v-if="state !== 'idle'"
        class="vo-mode-btn h-5 w-5 rounded text-[9px] font-semibold leading-none cursor-pointer flex items-center justify-center p-0 shrink-0 outline-none"
        :class="{ active: confirmMode }"
        :title="confirmMode ? 'Confirm before send' : 'Auto-send'"
        @click="toggleConfirm"
      >
        {{ confirmMode ? 'C' : 'A' }}
      </button>

      <div
        v-if="showMicPicker"
        class="vo-mic-picker absolute bottom-20 right-0 w-[260px] p-1.5 z-[100] max-h-[200px] overflow-y-auto"
      >
        <div
          v-for="d in ((stt as any)?.audio?.devices?.value?.length ? (stt as any).audio.devices.value : sharedAudio.devices.value)"
          :key="d.id"
          class="vo-mic-item flex items-center gap-2 px-2.5 py-2 rounded-md text-[11px] cursor-pointer"
          :class="{ active: ((stt as any)?.audio?.selectedDeviceId?.value ?? sharedAudio.selectedDeviceId.value) === d.id }"
          @click="pickMic(d.id)"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            width="12"
            height="12"
            class="vo-mic-icon shrink-0 opacity-50"
          >
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
          </svg>
          <span>{{ d.label }}</span>
        </div>
      </div>

      <button
        class="vo-mode-btn h-5 w-5 rounded text-[9px] font-semibold leading-none cursor-pointer flex items-center justify-center p-0 shrink-0 outline-none"
        :title="'Select microphone'"
        @click="toggleMicPicker"
      >
        M
      </button>

      <div class="relative w-[72px] h-[72px] shrink-0">
        <svg
          viewBox="0 0 160 160"
          class="absolute inset-0 w-full h-full"
          style="z-index:1"
          overflow="visible"
        >
          <defs>
            <filter
              id="orb-glow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="2.5"
                result="blur"
              />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <path
            ref="orbFillRef"
            stroke="none"
          />
        </svg>
        <button
          class="vo-btn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full cursor-pointer p-0 flex items-center justify-center transition-all duration-200"
          :class="state"
          style="z-index:2"
          @click="toggle"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-3.5 h-3.5"
          >
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
          </svg>
        </button>
        <svg
          viewBox="0 0 160 160"
          class="absolute inset-0 w-full h-full"
          style="z-index:3;pointer-events:none"
          overflow="visible"
        >
          <path
            ref="orbRingRef"
            fill="none"
            stroke-linecap="round"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

