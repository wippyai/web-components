// @vitest-environment happy-dom
import { expect, it, vi } from 'vitest'
import { getInstanceByDom } from 'echarts/core'
import * as engine from './app/echarts'
import { resolvedProps as resolveProps } from './test-props'
import { buildTheme } from './theme'

const loader = vi.hoisted(() => ({ load: vi.fn() }))
vi.mock('./loader', () => ({ loadECharts: loader.load }))
import { createChartController } from './chart-controller'

it.each([true, false])('uses only the latest full option during a deferred import, notMerge=%s', async (notMerge) => {
  let finish!: (value: typeof engine) => void
  const pending = new Promise<typeof engine>(resolve => { finish = resolve })
  loader.load.mockReturnValue(pending)
  const container = document.createElement('div')
  Object.defineProperties(container, { clientWidth: { value: 600 }, clientHeight: { value: 300 } })
  document.body.append(container)
  const emit = vi.fn()
  const loading = vi.fn()
  const controller = createChartController(container, emit, vi.fn(), loading)
  const theme = buildTheme({ getPropertyValue: () => '', color: 'navy', fontFamily: 'sans-serif' })
  const render = (option: object) => controller.render(resolveProps({ options: JSON.stringify(option), renderer: 'svg', notMerge }), theme, true)
  try {
    const complete = render({ animation: false, title: { subtext: 'Obsolete' }, series: [{ id: 'old', type: 'pie', data: [12] }] })
    const latest = render({ animation: false, title: { text: 'Latest' }, series: [{ id: 'sales', type: 'pie', data: [34] }] })
    expect(getInstanceByDom(container)).toBeUndefined()
    expect(loading).toHaveBeenLastCalledWith(true)
    finish(engine)
    await Promise.all([complete, latest])
    expect(loading).toHaveBeenLastCalledWith(false)
    const chart = getInstanceByDom(container)
    if (!chart) throw new Error('Expected an initialized chart')
    const option = chart.getOption()
    expect(option.series).toEqual([expect.objectContaining({ id: 'sales', data: [34] })])
    expect(option.title).toEqual([expect.objectContaining({ text: 'Latest', subtext: '' })])
    expect(emit).not.toHaveBeenCalledWith('chart-error', expect.anything())
  }
  finally {
    controller.stop()
    container.remove()
  }
})

it('retries a failed import with the current full option', async () => {
  loader.load.mockReset()
  loader.load.mockRejectedValueOnce(new Error('engine unavailable')).mockResolvedValue(engine)
  const container = document.createElement('div')
  Object.defineProperties(container, { clientWidth: { value: 600 }, clientHeight: { value: 300 } })
  document.body.append(container)
  const emit = vi.fn()
  const controller = createChartController(container, emit, vi.fn())
  const theme = buildTheme({ getPropertyValue: () => '', color: 'navy', fontFamily: 'sans-serif' })
  const render = (option: object) => controller.render(resolveProps({ options: JSON.stringify(option), renderer: 'svg', notMerge: false }), theme, true)
  try {
    await render({ animation: false, series: [{ type: 'pie', data: [12] }] })
    expect(emit).toHaveBeenCalledWith('chart-error', { message: 'engine unavailable' })
    await render({ animation: false, title: { text: 'Retried' }, series: [{ type: 'pie', data: [34] }] })
    const chart = getInstanceByDom(container)
    expect(chart?.getOption().series).toEqual([expect.objectContaining({ data: [34] })])
    expect(chart?.getOption().title).toEqual([expect.objectContaining({ text: 'Retried' })])
  }
  finally {
    controller.stop()
    container.remove()
  }
})
