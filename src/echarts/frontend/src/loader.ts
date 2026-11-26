import type * as EChartsRuntime from './app/echarts'

let runtime: Promise<typeof EChartsRuntime> | undefined

export function loadECharts() {
  return runtime ??= import('./app/echarts').catch((error: unknown) => {
    runtime = undefined
    throw error
  })
}
