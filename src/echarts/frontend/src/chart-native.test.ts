// @vitest-environment happy-dom
import { afterEach, expect, it, vi } from 'vitest'
import { getInstanceByDom } from 'echarts/core'
import type { EChartsCoreOption, EChartsType } from 'echarts/core'
import { init } from './app/echarts'
import { createChartController } from './chart-controller'
import { resolvedProps as resolveProps } from './test-props'
import { buildTheme } from './theme'
import { colorWithAlpha } from './colors'

const light = buildTheme({ getPropertyValue: () => '', color: '#111111', fontFamily: 'sans-serif' }, ['#123456'])
const dark = { ...light, textStyle: { ...light.textStyle, color: '#eeeeee' }, color: ['#abcdef'], darkMode: true }
const cleanup: (() => void)[] = []
afterEach(() => { cleanup.splice(0).forEach(stop => stop()); vi.restoreAllMocks() })

function setup(notMerge = false) {
  const container = document.createElement('div')
  document.body.append(container)
  Object.defineProperties(container, { clientWidth: { value: 600 }, clientHeight: { value: 400 } })
  const errors = vi.fn()
  const controller = createChartController(container, vi.fn(), errors)
  let options = ''
  cleanup.push(() => { controller.stop(); container.remove() })
  async function render(option?: EChartsCoreOption, theme = light) {
    if (option) options = JSON.stringify(option)
    await controller.render(resolveProps({ options, renderer: 'svg', notMerge }), theme, true)
    expect(errors).toHaveBeenLastCalledWith(null)
    const chart = getInstanceByDom(container)
    if (!chart) throw new Error('Expected chart')
    return chart
  }
  return { render, controller }
}

function direct(option: EChartsCoreOption) {
  const container = document.createElement('div')
  document.body.append(container)
  const chart = init(container, light, { renderer: 'svg', width: 600, height: 400 })
  chart.setOption(option)
  cleanup.push(() => { chart.dispose(); container.remove() })
  return chart
}

function state(chart: EChartsType) {
  const option = chart.getOption()
  return { zoom: option.dataZoom, selected: (option.legend as { selected: unknown }[])[0]?.selected }
}

const source = { animation: false, legend: {}, dataZoom: { type: 'inside' },
  xAxis: { type: 'category', data: ['A', 'B', 'C', 'D'] }, yAxis: {}, series: [{ id: 'sales', type: 'bar', name: 'Sales', data: [1, 2, 3, 4] }] }

it('renders dataset rows with dollar-prefixed dimension names', async () => {
  const { render } = setup()
  const row = { name: 'A', $revenue: 7 }
  const chart = await render({ animation: false, dataset: { source: [row] },
    xAxis: { type: 'category' }, yAxis: {}, series: [{ type: 'bar', encode: { x: 'name', y: '$revenue' } }] })
  expect(chart.getOption().dataset).toEqual([expect.objectContaining({ source: [row] })])
  expect(chart.getDataURL({ type: 'svg' })).toContain('svg')
})

const marker = { $seriesGradient: { from: 0.35, to: 0 } }
function expectMarkerPaint(chart: EChartsType, index: number, expected: string) {
  const paint = chart.getVisual({ seriesIndex: index }, 'color')
  expect(paint).toBe(expected)
  const series = chart.getOption().series as { areaStyle: { color: { colorStops: { color: string }[] } } }[]
  expect(series[index]?.areaStyle.color.colorStops).toEqual([
    { offset: 0, color: colorWithAlpha(String(paint), 0.35) },
    { offset: 1, color: colorWithAlpha(String(paint), 0) },
  ])
}

it.each(['itemStyle', 'lineStyle'])('keeps markers and engine paint aligned after an explicit %s color', async (style) => {
  const { render } = setup()
  const chart = await render({ animation: false, xAxis: {}, yAxis: {}, series: [
    { id: 'a', type: 'line', data: [1, 2], [style]: { color: '#ff0000' }, areaStyle: { color: marker } },
    { id: 'b', type: 'line', data: [3, 4], areaStyle: { color: marker } },
  ] }, { ...light, color: ['#123456', '#abcdef'] })
  expectMarkerPaint(chart, 0, '#ff0000')
  expectMarkerPaint(chart, 1, '#abcdef')
})

it.each(['id', 'name'])('matches media series by %s to the base palette and explicit color', async (key) => {
  const { render } = setup()
  const chart = await render({ baseOption: { animation: false, xAxis: {}, yAxis: {}, series: [
    { id: 'a', name: 'A', type: 'line', data: [1, 2] },
    { id: 'b', name: 'B', type: 'line', data: [3, 4] },
    { id: 'c', name: 'C', type: 'line', data: [5, 6], itemStyle: { color: '#ff0000' } },
  ] }, media: [{ query: { minWidth: 500 }, option: { series: [
    { [key]: key === 'id' ? 'b' : 'B', areaStyle: { color: marker } },
    { [key]: key === 'id' ? 'c' : 'C', areaStyle: { color: marker } },
  ] } }] }, { ...light, color: ['#123456', '#abcdef'] })
  expectMarkerPaint(chart, 1, '#abcdef')
  expectMarkerPaint(chart, 2, '#ff0000')
})

it('matches native merge and preserves zoom and legend selection across full-option data updates', async () => {
  const { render } = setup()
  const chart = await render(source)
  const reference = direct(source)
  for (const engine of [chart, reference]) {
    engine.dispatchAction({ type: 'dataZoom', start: 20, end: 60 })
    engine.dispatchAction({ type: 'legendUnSelect', name: 'Sales' })
  }
  const before = state(chart)
  const update = { ...source, series: [{ ...source.series[0], data: [4, 3, 2, 1] }] }
  reference.setOption(update)
  expect(await render(update)).toBe(chart)
  expect(state(chart)).toEqual(state(reference))
  expect(state(chart)).toEqual(before)
  expect(chart.getOption().series).toEqual([expect.objectContaining({ data: [4, 3, 2, 1] })])
})

it.each([false, true])('disposes on theme change and resets interaction to the current option, notMerge=%s', async (notMerge) => {
  const { render } = setup(notMerge)
  const chart = await render(source)
  chart.dispatchAction({ type: 'dataZoom', start: 20, end: 60 })
  chart.dispatchAction({ type: 'legendUnSelect', name: 'Sales' })
  const after = await render(undefined, dark)
  expect(chart.isDisposed()).toBe(true)
  expect(after).not.toBe(chart)
  expect(after.getOption().dataZoom).toEqual([expect.objectContaining({ start: 0, end: 100 })])
  expect(state(after).selected).toEqual({})
  expect(after.getOption().series).toEqual([expect.objectContaining({ data: [1, 2, 3, 4] })])
})

it('uses only current media definitions after a theme rebuild', async () => {
  const option = { baseOption: { animation: false, series: [{ id: 'a', type: 'pie', data: [1] }] },
    media: [{ query: { minWidth: 500 }, option: { series: [{ id: 'a', data: [99] }] } }] }
  const { render } = setup()
  const chart = await render(option)
  expect(chart.getOption().series).toEqual([expect.objectContaining({ data: [99] })])
  const current = { ...option, media: [{ query: { minWidth: 700 }, option: { series: [{ id: 'a', data: [77] }] } }] }
  const after = await render(current, dark)
  expect(chart.isDisposed()).toBe(true)
  expect(after.getOption().series).toEqual([expect.objectContaining({ data: [1] })])
  after.resize({ width: 800 })
  expect(after.getOption().series).toEqual([expect.objectContaining({ data: [77] })])
})

it.each([false, true])('applies defaults in baseOption and preserves explicit overrides=%s', async (explicit) => {
  const { render } = setup()
  const option = { baseOption: { animation: false, series: [{ type: 'pie', data: [1] }],
    ...(explicit ? { aria: { enabled: false }, tooltip: { confine: false, renderMode: 'html' } } : {}) }, options: [], media: [] }
  const chart = await render(option)
  await render({ ...option, baseOption: { ...option.baseOption, title: { text: 'Current' } } })
  expect(chart.getOption().aria).toMatchObject({ enabled: !explicit })
  expect(chart.getOption().tooltip).toEqual([expect.objectContaining({ confine: !explicit, renderMode: 'richText' })])
})

it.each([false, true])('retries with only the current full option, notMerge=%s', async (notMerge) => {
  const { render, controller } = setup(notMerge)
  const first = await render({ animation: false, title: { text: 'Old' }, series: [{ id: 'a', type: 'pie', data: [1] }] })
  await render({ animation: false, series: [{ id: 'a', type: 'pie', data: [2] }] })
  controller.fail(new Error('simulated failure'))
  const next = await render()
  expect(first.isDisposed()).toBe(true)
  expect(next).not.toBe(first)
  expect(next.getOption().title).toBeUndefined()
  expect(next.getOption().series).toEqual([expect.objectContaining({ data: [2] })])
})
