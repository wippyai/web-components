import { ref, watch, type Ref } from 'vue'

export interface PageContext {
  page: string
  route: string
  params: Record<string, string>
  agent_changed: boolean
}

interface PageMapping {
  agent: string
  route: string
}

export function usePageContext(pathRef: Ref<string>) {
  const current = ref<PageContext | null>(null)
  const previous = ref<PageContext | null>(null)
  const pageMap = ref<Record<string, PageMapping>>({})

  function resolvePageName(path: string): string {
    // extract page name from path: /page-name/... → page-name
    const segments = path.replace(/^\/+/, '').split('/')
    return segments[0] || 'home'
  }

  function resolveAgent(page: string): string {
    const mapping = pageMap.value[page]
    return mapping?.agent || ''
  }

  function extractParams(path: string): Record<string, string> {
    const segments = path.replace(/^\/+/, '').split('/')
    const params: Record<string, string> = {}
    // treat second segment as id if present
    if (segments.length > 1 && segments[1])
      params.id = segments[1]
    return params
  }

  function buildContext(): PageContext {
    const path = pathRef.value
    const page = resolvePageName(path)
    const params = extractParams(path)

    const prevAgent = previous.value ? resolveAgent(previous.value.page) : ''
    const newAgent = resolveAgent(page)

    return {
      page,
      route: path,
      params,
      agent_changed: prevAgent !== '' && prevAgent !== newAgent,
    }
  }

  function update() {
    const ctx = buildContext()
    previous.value = current.value
    current.value = ctx
  }

  function hasChanged(): boolean {
    if (!previous.value || !current.value) return true
    if (previous.value.page !== current.value.page) return true
    if (previous.value.route !== current.value.route) return true
    return false
  }

  function needsNewSession(): boolean {
    if (!previous.value) return true
    if (!current.value) return false
    const prevAgent = resolveAgent(previous.value.page)
    const newAgent = resolveAgent(current.value.page)
    return prevAgent !== '' && newAgent !== '' && prevAgent !== newAgent
  }

  watch(pathRef, () => update(), { immediate: true })

  return {
    current,
    previous,
    pageMap,
    hasChanged,
    needsNewSession,
    resolveAgent,
  }
}
