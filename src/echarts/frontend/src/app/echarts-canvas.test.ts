// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp, nextTick, ref } from 'vue'
import type { App } from 'vue'
import { getInstanceByDom } from 'echarts/core'
import type { ComponentProps } from '../types'
import { componentProps } from '../test-props'
import * as theme from '../theme'
import EChartsCanvas from './echarts-canvas.vue'
import './echarts'

const mocks = vi.hoisted(() => ({ emit: vi.fn(), on: vi.fn() }))
const input = ref<ComponentProps>(componentProps())
vi.mock('../constants', () => ({
  useComponentProps: () => input,
  useComponentEvents: () => mocks.emit,
}))
vi.mock('@wippy-fe/proxy', () => ({
  host: { getThemeMode: () => 'light' },
  on: mocks.on,
}))

let app: App | undefined
let mount: HTMLDivElement
let resize: () => void
let width = 600
let height = 300
let schemeChanged: () => void
let scheme: { matches: boolean, addEventListener: ReturnType<typeof vi.fn>, removeEventListener: ReturnType<typeof vi.fn> }

beforeEach(() => {
  vi.clearAllMocks()
  vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval', 'requestAnimationFrame', 'cancelAnimationFrame'] })
  mocks.on.mockReturnValue(vi.fn())
  width = 600
  height = 300
  scheme = { matches: false, addEventListener: vi.fn((_event, callback) => { schemeChanged = callback }), removeEventListener: vi.fn() }
  vi.stubGlobal('matchMedia', () => scheme)
  vi.stubGlobal('ResizeObserver', class {
    constructor(callback: () => void) { resize = callback }
    observe() {}
    disconnect() {}
  })
  vi.stubGlobal('IntersectionObserver', undefined)
  vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(() => width)
  vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockImplementation(() => height)
  mount = document.createElement('div')
  document.body.append(mount)
})

it('reads tokens once for a config change and keeps data updates and idle time free of token reads', async () => {
  const buildTheme = vi.spyOn(theme, 'buildTheme')
  await setup(true)
  expect(buildTheme).toHaveBeenCalledOnce()
  input.value.options = '{"animation":false,"series":[{"type":"pie","data":[5]}]}'
  await nextTick()
  await vi.advanceTimersByTimeAsync(2000)
  expect(buildTheme).toHaveBeenCalledOnce()
  const config = mocks.on.mock.calls.find(([event]) => event === '@config')?.[1]
  expect(config).toBeTypeOf('function')
  config({})
  config({})
  await vi.advanceTimersByTimeAsync(20)
  expect(buildTheme).toHaveBeenCalledTimes(2)
})

it('uses system preference changes only when the host and local mode are Auto', async () => {
  const buildTheme = vi.spyOn(theme, 'buildTheme')
  const { container } = await setup(true)
  scheme.matches = true
  schemeChanged()
  await vi.advanceTimersByTimeAsync(20)
  expect(buildTheme).toHaveBeenCalledOnce()
  const appliedTheme = mocks.on.mock.calls.find(([event]) => event === '@theme')?.[1]
  appliedTheme('auto')
  await vi.advanceTimersByTimeAsync(20)
  expect(getInstanceByDom(container)?.getOption().darkMode).toBe(true)
  scheme.matches = false
  schemeChanged()
  await vi.advanceTimersByTimeAsync(20)
  expect(getInstanceByDom(container)?.getOption().darkMode).toBe(false)
  expect(buildTheme).toHaveBeenCalledTimes(3)
  input.value.themeMode = 'light'
  await nextTick()
  scheme.matches = true
  schemeChanged()
  await vi.advanceTimersByTimeAsync(20)
  expect(buildTheme).toHaveBeenCalledTimes(4)
})

afterEach(() => {
  app?.unmount()
  app = undefined
  mount.remove()
  vi.useRealTimers()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

async function setup(notMerge: boolean) {
  input.value = componentProps({
    options: JSON.stringify({ animation: false, series: [{ id: 'sales', type: 'pie', data: [12] }] }),
    renderer: 'svg', notMerge,
  })
  app = createApp(EChartsCanvas)
  app.mount(mount)
  const container = mount.querySelector<HTMLElement>('.echarts-canvas-wrapper')
  if (!container) throw new Error('Expected the chart container')
  await vi.waitFor(() => expect(getInstanceByDom(container)).toBeDefined())
  const chart = getInstanceByDom(container)
  if (!chart) throw new Error('Expected an initialized chart')
  return { container, chart }
}

describe.each([true, false])('hidden component updates with notMerge=%s', (notMerge) => {
  it('applies the latest full option on reveal, then only resizes on later observations', async () => {
    const { container, chart } = await setup(notMerge)
    const setOption = vi.spyOn(chart, 'setOption')
    const resizeChart = vi.spyOn(chart, 'resize')
    width = 0
    resize()
    input.value.options = JSON.stringify({ animation: false, series: [{ id: 'sales', type: 'pie', data: [34] }] })
    await nextTick()
    expect(setOption).not.toHaveBeenCalled()
    expect(chart.getOption().series).toEqual([expect.objectContaining({ data: [12] })])
    width = 600
    resize()
    await vi.waitFor(() => expect(chart.getOption().series).toEqual([expect.objectContaining({ data: [34] })]))
    expect(getInstanceByDom(container)).toBe(chart)
    expect(setOption).toHaveBeenCalledOnce()
    expect(setOption).toHaveBeenLastCalledWith(expect.anything(), { notMerge, lazyUpdate: false })
    expect(resizeChart).toHaveBeenCalled()
    resize()
    await vi.advanceTimersByTimeAsync(1000)
    expect(setOption).toHaveBeenCalledOnce()
    expect(mocks.emit).not.toHaveBeenCalledWith('chart-error', expect.anything())
  })

  it('applies a host theme change received while hidden', async () => {
    const { container, chart } = await setup(notMerge)
    height = 0
    resize()
    const themeListener = mocks.on.mock.calls.find(([event]) => event === '@theme')?.[1]
    expect(themeListener).toBeTypeOf('function')
    themeListener('dark')
    await vi.advanceTimersByTimeAsync(1000)
    expect(chart.isDisposed()).toBeFalsy()
    expect(chart.getOption().darkMode).toBe(false)
    height = 300
    resize()
    await vi.waitFor(() => expect(getInstanceByDom(container)).not.toBe(chart))
    const replacement = getInstanceByDom(container)
    expect(chart.isDisposed()).toBe(true)
    expect(replacement?.getOption().darkMode).toBe(true)
    expect(replacement?.getOption().series).toEqual([expect.objectContaining({ data: [12] })])
    resize()
    await vi.advanceTimersByTimeAsync(1000)
    expect(getInstanceByDom(container)).toBe(replacement)
    expect(mocks.emit).not.toHaveBeenCalledWith('chart-error', expect.anything())
  })

  it('applies a palette change while hidden with autoresize disabled', async () => {
    const { container, chart } = await setup(notMerge)
    input.value.autoresize = false
    await nextTick()
    const resizeChart = vi.spyOn(chart, 'resize')
    width = 0
    resize()
    input.value.palette = '["#123456"]'
    await nextTick()
    await vi.advanceTimersByTimeAsync(1000)
    expect(chart.isDisposed()).toBeFalsy()
    width = 600
    resize()
    await vi.waitFor(() => expect(getInstanceByDom(container)).not.toBe(chart))
    expect(getInstanceByDom(container)?.getOption().color).toEqual(['#123456'])
    expect(resizeChart).not.toHaveBeenCalled()
    expect(mocks.emit).not.toHaveBeenCalledWith('chart-error', expect.anything())
  })
})
