<script setup lang="ts">
import { computed, ref, useTemplateRef, watchEffect } from 'vue'
import { useContent } from '@wippy-fe/webcomponent-vue'
import { useComponentProps } from '../constants'

type Render =
  | { kind: 'empty' }
  | { kind: 'svg', svg: string }
  | { kind: 'error', message: string }
  | { kind: 'loading' }

const props = useComponentProps()
const content = useContent()
const rootEl = useTemplateRef<HTMLElement>('rootEl')

const definition = computed(() =>
  (props.value.definition || content.value || '').trim()
)

const render = ref<Render>({ kind: 'empty' })

watchEffect(async (onCleanup) => {
  const def = definition.value
  if (!def) {
    render.value = { kind: 'empty' }
    return
  }

  let stale = false
  onCleanup(() => { stale = true })
  render.value = { kind: 'loading' }

  try {
    const { render: renderPele } = await import('pele')
    if (stale)
      return
    const host = rootEl.value ?? document.documentElement
    const { svg } = renderPele(def, {
      fontFamily: getComputedStyle(host).fontFamily,
      idPrefix: `pele-${Math.random().toString(36).slice(2)}`,
      links: false,
      images: false,
    })
    render.value = { kind: 'svg', svg }
  }
  catch (err) {
    if (!stale) {
      const message = err instanceof Error ? err.message : String(err)
      render.value = { kind: 'error', message }
    }
  }
})
</script>

<template>
  <div ref="rootEl">
    <div
      v-if="render.kind === 'loading'"
      class="mermaid-loading"
      role="status"
    >
      Rendering diagram…
    </div>
    <div
      v-else-if="render.kind === 'error'"
      class="mermaid-error"
      role="alert"
    >
      {{ render.message }}
    </div>
    <div
      v-else-if="render.kind === 'svg'"
      class="mermaid-container"
      :class="{ 'mermaid-card': props.transparent === false }"
      role="img"
      aria-label="Mermaid diagram"
      v-html="render.svg"
    />
  </div>
</template>
