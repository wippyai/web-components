<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { host, on } from '@wippy-fe/proxy'
import { useComponentEvents, useComponentProps } from '../constants'
import { createChartController } from '../chart-controller'
import { resolveProps } from '../props'
import { buildTheme } from '../theme'
import { chartLabel } from '../options'

const props = useComponentProps()
const emit = useComponentEvents()
const container = ref<HTMLDivElement | null>(null)
const errorMsg = ref<string | null>(null)
const enginePending = ref(true)
const busy = computed(() => !errorMsg.value && (enginePending.value || props.value.loading))
const label = computed(() => chartLabel(props.value.label, props.value.options))
let controller: ReturnType<typeof createChartController> | undefined
let resizeObserver: ResizeObserver | undefined
let viewportObserver: IntersectionObserver | undefined
let scheme: MediaQueryList | undefined
let unsubscribeTheme: (() => void) | undefined
let unsubscribeConfig: (() => void) | undefined
let theme: ReturnType<typeof buildTheme> | undefined
let themePalette: string | undefined
let themeMode: string | undefined
let themeFrame = 0
let visible = false
let hostMode: 'auto' | 'light' | 'dark' = 'auto'

function render(refreshTheme = false) {
  if (!controller || !container.value)
    return
  try {
    const settings = resolveProps(props.value)
    if (!theme || refreshTheme || themePalette !== props.value.palette || themeMode !== settings.themeMode) {
      const mode = settings.themeMode === 'auto' ? hostMode : settings.themeMode
      const root = container.value.getRootNode()
      // Read host-resolved tokens once per theme, config or palette change.
      const themeHost = root instanceof ShadowRoot ? root.host : container.value
      theme = buildTheme(getComputedStyle(themeHost), settings.palette,
        mode === 'dark' || (mode === 'auto' && Boolean(scheme?.matches)))
      themePalette = props.value.palette
      themeMode = settings.themeMode
    }
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

function schemeChanged() {
  if (props.value.themeMode === 'auto' && hostMode === 'auto')
    scheduleTheme()
}

onMounted(() => {
  if (!container.value)
    return
  controller = createChartController(container.value, emit,
    message => errorMsg.value = message, pending => enginePending.value = pending)
  hostMode = host.getThemeMode()
  scheme = matchMedia('(prefers-color-scheme: dark)')
  scheme.addEventListener('change', schemeChanged)
  unsubscribeTheme = on('@theme', (mode) => {
    hostMode = mode
    scheduleTheme()
  })
  unsubscribeConfig = on('@config', scheduleTheme)
  resizeObserver = new ResizeObserver(() => {
    if (props.value.autoresize)
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
  render()
})

watch(props, () => render(), { deep: true, flush: 'post' })
onUnmounted(() => {
  cancelAnimationFrame(themeFrame)
  resizeObserver?.disconnect()
  viewportObserver?.disconnect()
  scheme?.removeEventListener('change', schemeChanged)
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
    :aria-busy="busy"
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
    <wippy-loading
      v-if="busy"
      class="echarts-loading"
      no-bg
      :title="props.loadingText"
    />
  </div>
</template>
