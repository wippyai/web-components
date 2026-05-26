import { ref, type Ref } from 'vue'

export interface FeedItem {
  id: string
  role: 'user' | 'agent' | 'system'
  text: string
  streaming?: boolean
}

const MAX_FEED_SIZE = 20

export function useFeed(feedEl: Ref<HTMLElement | null>) {
  const items = ref<FeedItem[]>([])

  let protectedIds: Set<string> = new Set()

  function protect(id: string | null) {
    if (id) protectedIds.add(id)
  }

  function unprotect(id: string | null) {
    if (id) protectedIds.delete(id)
  }

  function scroll() {
    setTimeout(() => { if (feedEl.value) feedEl.value.scrollTop = feedEl.value.scrollHeight }, 50)
  }

  function add(role: FeedItem['role'], text: string): string {
    const id = `f-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    items.value.push({ id, role, text })
    while (items.value.length > MAX_FEED_SIZE) {
      const oldest = items.value[0]
      if (protectedIds.has(oldest.id)) break
      items.value.shift()
    }
    scroll()
    return id
  }

  function insertBefore(beforeId: string, role: FeedItem['role'], text: string): string {
    const id = `f-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    const idx = items.value.findIndex(f => f.id === beforeId)
    if (idx >= 0) {
      items.value.splice(idx, 0, { id, role, text })
    }
    else {
      items.value.push({ id, role, text })
    }
    scroll()
    return id
  }

  function update(id: string | null, text: string, streaming = true) {
    if (!id) return
    const item = items.value.find(f => f.id === id)
    if (item) { item.text = text; item.streaming = streaming }
    scroll()
  }

  function finalize(id: string | null) {
    if (!id) return
    const item = items.value.find(f => f.id === id)
    if (item) item.streaming = false
    unprotect(id)
  }

  function clear() {
    items.value = []
    protectedIds = new Set()
  }

  return { items, add, insertBefore, update, finalize, protect, unprotect, clear }
}
