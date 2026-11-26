// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { getInstanceByDom } from 'echarts/core'
import type { EChartsCoreOption, EChartsType } from 'echarts/core'
import { createChartController } from './chart-controller'
import { resolveProps } from './props'
import { buildTheme } from './theme'
// Load registrations before test timing starts; every test still uses the real
// controller, dynamic loader, engine, SVG renderer and tooltip implementation.
import './app/echarts'

const light = buildTheme({ getPropertyValue: key => ({ '--p-text-color': '#111111', '--p-content-border-color': '#333333', '--p-text-muted-color': '#555555', '--p-content-background': '#ffffff' })[key] ?? '', color: '#111111', fontFamily: 'sans-serif' }, ['#123456'])
const dark = buildTheme({ getPropertyValue: key => ({ '--p-text-color': '#eeeeee', '--p-content-border-color': '#cccccc', '--p-text-muted-color': '#aaaaaa', '--p-content-background': '#111111' })[key] ?? '', color: '#eeeeee', fontFamily: 'sans-serif' }, ['#abcdef'], true)
const stops: (() => void)[] = []

function setup(notMerge = true) {
  const host = document.createElement('div')
  const root = host.attachShadow({ mode: 'open' })
  const container = document.createElement('div')
  root.append(container)
  document.body.append(host)
  Object.defineProperties(container, { clientWidth: { value: 600 }, clientHeight: { value: 400 } })
  const errors = vi.fn()
  const controller = createChartController(container, vi.fn(), errors)
  stops.push(() => { controller.stop(); host.remove() })
  let options = ''
  async function render(option: EChartsCoreOption, theme = light, replace = notMerge) {
    options = JSON.stringify(option)
    await controller.render(resolveProps({ options, renderer: 'svg', notMerge: replace }), theme, true)
    expect(errors).toHaveBeenLastCalledWith(null)
    const chart = getInstanceByDom(container)
    expect(chart).toBeDefined()
    if (!chart) throw new Error('Expected an initialized chart')
    return chart
  }
  async function switchTheme() {
    await controller.render(resolveProps({ options, renderer: 'svg', notMerge }), dark, true)
    expect(errors).toHaveBeenLastCalledWith(null)
    const chart = getInstanceByDom(container)
    if (!chart) throw new Error('Expected a rebuilt chart')
    return chart
  }
  return { container, root, render, switchTheme }
}

afterEach(() => {
  stops.splice(0).forEach(stop => stop())
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

const payload = (label: string) => `${label}<img src=x onerror="globalThis.echartsInjected=true">`
const formatter = `${payload('FORMATTER')} {a} {b} {c}`

describe('real tooltip DOM security', () => {
  it.each(['global', 'series', 'data', 'string-data', 'default', 'descriptor'])(
    'renders a safe, themed item tooltip from %s options', async (position) => {
      vi.stubGlobal('echartsInjected', false)
      const { render, root, container } = setup()
      const tooltip = { formatter, renderMode: 'html' }
      const chart = await render({
        animation: false,
        tooltip: { trigger: 'item', showDelay: 0, hideDelay: 0, ...(position === 'global' ? tooltip : {}), ...(position === 'descriptor' ? { formatter: { $format: `time:${payload('DESCRIPTOR')}` } } : {}) },
        series: [{ type: 'pie', label: { show: false }, name: payload('SERIES'), ...(position === 'series' ? { tooltip } : {}),
          data: [{ name: payload('DATA'), value: 12, ...(position === 'data' ? { tooltip } : {}), ...(position === 'string-data' ? { tooltip: formatter } : {}) }],
        }],
      })
      chart.dispatchAction({ type: 'showTip', seriesIndex: 0, dataIndex: 0 })
      // Exercise ECharts' rendering and DOM insertion, not just option conversion.
      await vi.waitFor(() => expect(container.textContent).toContain(position === 'descriptor' ? 'DESCRIPTOR' : 'DATA'))
      if (position !== 'descriptor')
        expect(container.textContent).toContain('SERIES')
      if (['global', 'series', 'data', 'string-data'].includes(position))
        expect(container.textContent).toContain('FORMATTER')
      expect(root.querySelector('img,script,[onerror],[onload]')).toBeNull()
      expect(document.querySelector('img,script,[onerror],[onload]')).toBeNull()
      expect(Reflect.get(globalThis, 'echartsInjected')).toBe(false)
      expect(chart.getOption().tooltip).toEqual([expect.objectContaining({ renderMode: 'richText', textStyle: expect.objectContaining({ color: light.textStyle.color }), backgroundColor: light.tooltip.backgroundColor })])
      expect(container.querySelectorAll('svg text').length).toBeGreaterThan(0)
    },
  )

  it.each(['global', 'tooltip', 'axis'])('renders category and axis-pointer payloads through %s pointer options', async (position) => {
    const { render, root, container } = setup()
    const pointer = { label: { show: true, formatter: payload('POINTER') + ' {value}' } }
    const chart = await render({ animation: false,
      tooltip: { trigger: 'axis', showDelay: 0, ...(position === 'tooltip' ? { axisPointer: pointer } : {}) },
      ...(position === 'global' ? { axisPointer: pointer } : {}),
      xAxis: { type: 'category', data: [payload('CATEGORY')], ...(position === 'axis' ? { axisPointer: pointer } : {}) },
      yAxis: {}, series: [{ type: 'bar', name: payload('SERIES'), data: [12] }],
    })
    chart.dispatchAction({ type: 'showTip', seriesIndex: 0, dataIndex: 0 })
    await vi.waitFor(() => expect(container.textContent).toContain('POINTER'))
    expect(container.textContent).toContain('CATEGORY')
    expect(root.querySelector('img,script,[onerror],[onload]')).toBeNull()
  })
})

function colors(chart: EChartsType) {
  const option = chart.getOption()
  return { text: option.textStyle, palette: option.color, xAxis: option.xAxis }
}

describe('real engine theme recreation', () => {
  it('rebuilds once with current data after repeated full-option updates', async () => {
    const { render, switchTheme, container } = setup(false)
    const source = { animation: false, dataset: [{ id: 'rows', source: [['name', 'value'], ['A', 0]] }],
      xAxis: { type: 'category' }, yAxis: {}, series: [{ id: 'sales', type: 'bar' }] }
    const before = await render(source)
    for (let i = 1; i <= 100; i++) {
      await render({ ...source, dataset: [{ id: 'rows', source: [['name', 'value'], ['A', i]] }],
        series: [{ id: 'sales', type: 'bar', name: 'Sales ' + i }] })
    }
    const calls = vi.spyOn(Object.getPrototypeOf(before) as EChartsType, 'setOption')
    const after = await switchTheme()
    expect(calls).toHaveBeenCalledOnce()
    expect(before.isDisposed()).toBe(true)
    expect(after).not.toBe(before)
    expect(after.getOption().dataset).toEqual([expect.objectContaining({ id: 'rows', source: [['name', 'value'], ['A', 100]] })])
    expect(after.getOption().series).toEqual([expect.objectContaining({ id: 'sales', name: 'Sales 100' })])
    expect(after.getOption().color).toEqual(['#abcdef'])
    expect(container.querySelector('path[fill="#abcdef"]')).not.toBeNull()
  })

  it.each([true, false])('recreates and repaints text, axes and palette with notMerge=%s', async (notMerge) => {
    const { render, switchTheme, container } = setup(notMerge)
    const source = { animation: false, title: { text: 'Original' }, xAxis: { type: 'category', data: ['A'] }, yAxis: {}, series: [{ id: 'a', type: 'bar', data: [12] }] }
    const before = await render(source)
    expect(container.querySelector('path[fill="#123456"]')).not.toBeNull()
    const oldColors = colors(before)
    await render({ ...source, title: { text: 'Updated' } })
    const after = await switchTheme()
    expect(before.isDisposed()).toBe(true)
    expect(after).not.toBe(before)
    expect(colors(after)).not.toEqual(oldColors)
    const resolved = after.getOption()
    expect(resolved.textStyle).toMatchObject({ color: '#eeeeee' })
    expect(resolved.color).toEqual(['#abcdef'])
    expect(resolved.xAxis).toEqual([expect.objectContaining({ axisLine: expect.objectContaining({ lineStyle: expect.objectContaining({ color: '#cccccc' }) }) })])
    expect(resolved.title).toEqual([expect.objectContaining({ text: 'Updated' })])
    expect(resolved.series).toEqual([expect.objectContaining({ id: 'a', data: [12] })])
    expect(container.querySelector('path[fill="#abcdef"]')).not.toBeNull()
    expect(container.querySelector('path[fill="#123456"]')).toBeNull()
    expect(container.querySelector('text[fill="#eeeeee"]')).not.toBeNull()
  })

  it('keeps explicit caller colors when rebuilding from the current option', async () => {
    const { render, switchTheme } = setup(false)
    const source = { animation: false, title: { textStyle: { color: '#fedcba' } }, xAxis: { type: 'category', data: ['A'] }, yAxis: {}, series: [
      { id: 'a', name: 'A', type: 'bar', data: [1], itemStyle: { color: '#654321' } },
      { id: 'b', name: 'B', type: 'line', data: [2] },
    ] }
    await render(source)
    await render({ ...source, series: source.series.map(series => ({ ...series, data: [20] })) })
    const after = (await switchTheme()).getOption()
    expect(after.series).toEqual([
      expect.objectContaining({ id: 'a', data: [20], itemStyle: expect.objectContaining({ color: '#654321' }) }),
      expect.objectContaining({ id: 'b', data: [20] }),
    ])
    expect(after.title).toEqual([expect.objectContaining({ textStyle: expect.objectContaining({ color: '#fedcba' }) })])
    expect(after.color).toEqual(['#abcdef'])
  })
})

describe('real title link activation', () => {
  it('clears earlier links when a merge update supplies an unsafe URL', async () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const { render, switchTheme } = setup(false)
    await render({ animation: false, title: { text: 'Title', subtext: 'Subtitle', link: '/safe', sublink: '/safe', target: 'self', subtarget: 'self' } })
    await render({ animation: false, title: { text: 'Title', subtext: 'Subtitle', link: 'javascript:alert(1)', sublink: 'data:text/html,bad', target: 'self', subtarget: 'self' } })
    expect(warn).toHaveBeenCalledTimes(2)
    const chart = await switchTheme()
    expect(chart.getOption().title).toEqual([expect.objectContaining({ link: null, sublink: null })])
    for (const text of chart.getZr().storage.getDisplayList().filter(el => el.type === 'tspan'))
      expect(text.parent?.onclick).toBeFalsy()
    expect(open).not.toHaveBeenCalled()
  })
  it.each(['javascript:alert(1)', ' java\nscript:alert(1)', 'data:text/html,<script>alert(1)</script>', 'https://example.org', 'mailto:team@example.org', '/relative'])('filters title and subtitle click URLs: %s', async (link) => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    const { render } = setup()
    const chart = await render({ animation: false, title: { text: 'Title', subtext: 'Subtitle', link, sublink: link, target: 'self', subtarget: 'self' } })
    const texts = chart.getZr().storage.getDisplayList().filter(el => el.type === 'tspan')
    expect(texts).toHaveLength(2)
    for (const text of texts) {
      const target = text.parent
      if (!target) throw new Error('Expected a clickable title text parent')
      target.trigger('click', {
        type: 'click', event: Object.assign(new MouseEvent('click'), {
          zrX: 0, zrY: 0, zrDelta: 0, zrEventControl: 'no_globalout' as const, zrByTouch: false,
        }), target, topTarget: text,
        cancelBubble: false, offsetX: 0, offsetY: 0, gestureEvent: '',
        pinchX: 0, pinchY: 0, pinchScale: 1, wheelDelta: 0, zrByTouch: false, which: 1, stop() {},
      })
    }
    if (['https://example.org', 'mailto:team@example.org', '/relative'].includes(link)) {
      expect(open).toHaveBeenCalledTimes(2)
      expect(open).toHaveBeenCalledWith(link, '_self')
    }
    else {
      expect(open).not.toHaveBeenCalled()
    }
  })
})
