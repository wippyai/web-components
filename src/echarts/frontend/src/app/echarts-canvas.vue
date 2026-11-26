<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { host, on } from '@wippy-fe/proxy'
import { useComponentEvents, useComponentProps } from '../constants'
import { createChartController } from '../chart-controller'
import { resolveProps } from '../props'
import { buildTheme } from '../theme'

const props = useComponentProps()
const emit = useComponentEvents()
const container = ref<HTMLDivElement | null>(null)
const errorMsg = ref<string | null>(null)
const label = computed(() => props.value.label ?? 'Chart')
let controller: ReturnType<typeof createChartController> | undefined
let resizeObserver: ResizeObserver | undefined
let themeObserver: MutationObserver | undefined
let viewportObserver: IntersectionObserver | undefined
let scheme: MediaQueryList | undefined
let unsubscribeTheme: (() => void) | undefined
let unsubscribeConfig: (() => void) | undefined
let tokenTimer: ReturnType<typeof setInterval> | undefined
let themeKey = ''
let themeFrame = 0
let visible = false
let hostMode: 'auto' | 'light' | 'dark' = 'auto'

function render(onlyIfThemeChanged = false) {
  if (!controller || !container.value)
    return
  try {
    const settings = resolveProps(props.value)
    const mode = settings.themeMode === 'auto' ? hostMode : settings.themeMode
    const root = container.value.getRootNode()
    // Host-resolved values preserve explicit token overrides even when the
    // injected inner theme root declares its own forced-mode defaults.
    const themeHost = root instanceof ShadowRoot ? root.host : container.value
    const theme = buildTheme(getComputedStyle(themeHost), settings.palette,
      mode === 'dark' || (mode === 'auto' && Boolean(scheme?.matches)))
    const key = JSON.stringify(theme)
    if (onlyIfThemeChanged && key === themeKey)
      return
    themeKey = key
    void controller.render(settings, theme, visible)
  }
  catch (cause) {
    controller.fail(cause)
  }
}

function scheduleTheme() {
  cancelAnimationFrame(themeFrame)
  themeFrame = requestAnimationFrame(() => render(true))
}

onMounted(() => {
  if (!container.value)
    return
  controller = createChartController(container.value, emit, message => errorMsg.value = message)
  hostMode = host.getThemeMode()
  scheme = matchMedia('(prefers-color-scheme: dark)')
  scheme.addEventListener('change', scheduleTheme)
  unsubscribeTheme = on('@theme', (mode) => {
    hostMode = mode
    scheduleTheme()
  })
  unsubscribeConfig = on('@config', scheduleTheme)
  resizeObserver = new ResizeObserver(() => {
    if (props.value.autoresize !== false)
      controller?.resize()
    if (!controller?.initialized() || controller.pending())
      render()
  })
  resizeObserver.observe(container.value)
  if (typeof IntersectionObserver !== 'undefined') {
    viewportObserver = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting)) {
        visible = true
        viewportObserver?.disconnect()
        render()
      }
    }, { rootMargin: '200px' })
    viewportObserver.observe(container.value)
  }
  else {
    visible = true
  }
  themeObserver = new MutationObserver(scheduleTheme)
  let ancestor: Element | null = container.value
  while (ancestor) {
    themeObserver.observe(ancestor, { attributes: true })
    const ancestorRoot = ancestor.getRootNode()
    if (ancestorRoot instanceof ShadowRoot)
      themeObserver.observe(ancestorRoot, { childList: true, characterData: true, subtree: true })
    ancestor = ancestor.parentElement
      ?? (ancestorRoot instanceof ShadowRoot ? ancestorRoot.host : null)
  }
  // CSSOM/adoptedStyleSheet edits need not emit mutations. Compare resolved values.
  tokenTimer = setInterval(() => render(true), 1000)
  render()
})

watch(props, () => render(), { deep: true, flush: 'post' })
onUnmounted(() => {
  cancelAnimationFrame(themeFrame)
  clearInterval(tokenTimer)
  resizeObserver?.disconnect()
  themeObserver?.disconnect()
  viewportObserver?.disconnect()
  scheme?.removeEventListener('change', scheduleTheme)
  unsubscribeTheme?.()
  unsubscribeConfig?.()
  controller?.stop()
})
</script>

<template>
  <div
    class="echarts-container"
    role="figure"
    :aria-label="label"
    :aria-busy="props.loading === true"
  >
    <div
      v-if="errorMsg"
      class="echarts-error"
      role="alert"
    >
      {{ errorMsg }}
    </div>
    <div
      ref="container"
      class="echarts-canvas-wrapper"
    />
  </div>
</template>
