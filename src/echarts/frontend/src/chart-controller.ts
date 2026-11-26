import type { EChartsType } from 'echarts/core'
import type { Events } from './constants'
import type { ResolvedProps } from './props'
import { loadECharts } from './loader'
import { toClickDetail } from './click-detail'
import { legendDetail, zoomDetail } from './event-detail'
import { parseOptions, secureOptions, withDefaults } from './options'
import type { buildTheme } from './theme'

type Emit = <K extends keyof Events>(event: K, detail: Events[K]) => void
type Theme = ReturnType<typeof buildTheme>

export function createChartController(container: HTMLElement, emit: Emit, error: (message: string | null) => void, loading: (pending: boolean) => void = () => {}) {
  let chart: EChartsType | undefined
  let runtime: Awaited<ReturnType<typeof loadECharts>> | undefined
  let stopped = false
  let revision = 0
  let renderer = ''
  let themeIdentity = ''
  // Only track the last applied full option. There is no patch history.
  let lastJSON: string | undefined
  let lastNotMerge: boolean | undefined
  let pendingRender = false
  let renderRequested = false

  function dispose() {
    renderRequested = false
    chart?.dispose()
    chart = undefined
  }

  function fail(cause: unknown) {
    revision++
    pendingRender = false
    loading(false)
    dispose()
    const message = cause instanceof Error ? cause.message : String(cause)
    error(message)
    emit('chart-error', { message })
  }

  return {
    async render(props: ResolvedProps, theme: Theme, visible: boolean) {
      const current = ++revision
      if (stopped) return
      pendingRender = true
      const parsed = parseOptions(props.options)
      if (!parsed.option) {
        fail(new Error(parsed.error))
        return
      }
      error(null)
      if (!chart)
        loading(true)
      try {
        if (!container.clientWidth || !container.clientHeight)
          return
        if (props.lazyInit && !visible)
          return
        runtime ??= await loadECharts()
        if (stopped || current !== revision)
          return
        const nextTheme = JSON.stringify(theme)
        // Theme/renderer changes start from the current full desired option.
        // Engine-only interaction and accumulated media effects deliberately reset.
        if (chart && (renderer !== props.renderer || themeIdentity !== nextTheme)) {
          dispose()
        }
        let initialized = false
        if (!chart) {
          chart = runtime.init(container, theme, { renderer: props.renderer })
          renderer = props.renderer
          themeIdentity = nextTheme
          initialized = true
          for (const [source, target] of [
            ['click', 'chart-click'], ['dblclick', 'chart-dblclick'], ['mouseover', 'chart-hover'],
          ] as const) {
            chart.on(source, (event) => {
              const detail = toClickDetail(event)
              if (detail)
                emit(target, detail)
            })
          }
          chart.on('legendselectchanged', event => emit('legend-change', legendDetail(event)))
          chart.on('datazoom', event => emit('datazoom', zoomDetail(event)))
          chart.on('finished', () => {
            if (renderRequested) {
              renderRequested = false
              emit('chart-rendered', {})
            }
          })
        }
        chart.group = props.group
        if (props.group)
          runtime.connect(props.group)
        if (initialized || lastJSON !== props.options || lastNotMerge !== props.notMerge) {
          renderRequested = true
          chart.setOption(runtime.withFormatters(secureOptions(withDefaults(parsed.option))), {
            notMerge: props.notMerge,
            lazyUpdate: props.lazyUpdate,
          })
          lastJSON = props.options
          lastNotMerge = props.notMerge
        }
        loading(false)
        pendingRender = false
      }
      catch (cause) {
        if (!stopped && current === revision)
          fail(cause)
      }
    },
    fail,
    initialized: () => Boolean(chart),
    pending: () => pendingRender,
    resize() { chart?.resize() },
    stop() {
      stopped = true
      revision++
      pendingRender = false
      loading(false)
      dispose()
      lastJSON = undefined
      lastNotMerge = undefined
    },
  }
}
