import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createChartController } from './chart-controller'
import { resolveProps } from './props'
import { buildTheme } from './theme'

const mocks = vi.hoisted(() => ({
  init: vi.fn(), connect: vi.fn(),
  handlers: new Map<string, (event: unknown) => void>(),
  chart: { on: vi.fn(), dispose: vi.fn(), setOption: vi.fn(), resize: vi.fn(), showLoading: vi.fn(), hideLoading: vi.fn(), group: '' },
}))
// Mock the module behind the actual dynamic import, rather than bypassing the loader.
vi.mock('./app/echarts', async () => ({ init: mocks.init, connect: mocks.connect, withFormatters: (await import('./formatters')).withFormatters }))

const theme = buildTheme({ getPropertyValue: () => '', color: 'navy', fontFamily: 'Test' })
function fire(name: string, value: unknown) {
  const handler = mocks.handlers.get(name)
  if (!handler)
    throw new Error(`Missing chart handler: ${name}`)
  handler(value)
}
function setup(width = 600) {
  const emit = vi.fn()
  const error = vi.fn()
  const container = { clientWidth: width, clientHeight: 300 } as HTMLElement
  return { controller: createChartController(container, emit, error), emit, error, container }
}

beforeEach(() => {
  vi.clearAllMocks()
  mocks.handlers.clear()
  mocks.chart.on.mockImplementation((name, callback) => mocks.handlers.set(name, callback))
  mocks.init.mockReturnValue(mocks.chart)
})

describe('lazy chart controller', () => {
  it('replaces declarative callbacks before setOption', async () => {
    const { controller } = setup()
    await controller.render(resolveProps({ options: JSON.stringify({
      tooltip: { trigger: 'axis', axisPointer: { label: { formatter: { $format: 'date' } } } },
      series: [{ type: 'line', label: { formatter: { $format: 'compact' } } }],
    }) }), theme, true)
    const option = mocks.chart.setOption.mock.calls[mocks.chart.setOption.mock.calls.length - 1][0]
    expect(option.tooltip.axisPointer.label.formatter).toBeTypeOf('function')
    expect(option.tooltip.axisPointer.label.formatter({ value: '2026-11-20' })).not.toContain('00:00:00')
    expect(option.series[0].label.formatter).toBeTypeOf('function')
  })
  it('does not import or init until valid, sized and near the viewport', async () => {
    vi.resetModules()
    const { createChartController: create } = await import('./chart-controller')
    const box = { clientWidth: 0, clientHeight: 300 } as HTMLElement
    const controller = create(box, vi.fn(), vi.fn())
    const props = resolveProps({ lazyInit: true })
    await controller.render(props, theme, false)
    expect(mocks.init).not.toHaveBeenCalled()
    Object.defineProperty(box, 'clientWidth', { value: 600 })
    await controller.render(props, theme, false)
    expect(mocks.init).not.toHaveBeenCalled()
    await controller.render(props, theme, true)
    expect(mocks.init).toHaveBeenCalledTimes(1)
  })
  it('emits parse and init errors and recovers', async () => {
    const { controller, emit, error } = setup()
    await controller.render(resolveProps({ options: '{' }), theme, true)
    expect(emit).toHaveBeenCalledWith('chart-error', { message: expect.stringContaining('Invalid options JSON') })
    expect(mocks.init).not.toHaveBeenCalled()
    mocks.init.mockImplementationOnce(() => { throw new Error('init failed') })
    await controller.render(resolveProps({}), theme, true)
    expect(emit).toHaveBeenCalledWith('chart-error', { message: 'init failed' })
    await controller.render(resolveProps({}), theme, true)
    expect(error).toHaveBeenLastCalledWith(null)
    expect(mocks.chart.setOption).toHaveBeenCalled()
  })
  it('maps all seven event types through the event bridge', async () => {
    const { controller, emit } = setup()
    await controller.render(resolveProps({}), theme, true)
    const point = { componentType: 'series', seriesIndex: 1, dataIndex: 2, name: 'A', seriesName: 'Sales', data: 8 }
    for (const [source, target] of [['click', 'chart-click'], ['dblclick', 'chart-dblclick'], ['mouseover', 'chart-hover']]) {
      fire(source, point)
      expect(emit).toHaveBeenLastCalledWith(target, { label: 'A', datasetLabel: 'Sales', datasetIndex: 1, dataIndex: 2, value: 8 })
      fire(source, { componentType: 'legend' })
    }
    expect(emit).toHaveBeenCalledTimes(3)
    fire('legendselectchanged', { selected: { Sales: false } })
    expect(emit).toHaveBeenLastCalledWith('legend-change', { selected: { Sales: false } })
    fire('datazoom', { batch: [{ start: 10, end: 60 }] })
    expect(emit).toHaveBeenLastCalledWith('datazoom', { start: 10, end: 60 })
    fire('finished', {})
    expect(emit).toHaveBeenLastCalledWith('chart-rendered', {})
    controller.fail(new Error('bad palette'))
    expect(emit).toHaveBeenLastCalledWith('chart-error', { message: 'bad palette' })
  })
  it('passes renderer, loading, merge, update and connect settings', async () => {
    const { controller } = setup()
    const props = resolveProps({ renderer: 'svg', loading: true, loadingText: 'Wait', group: 'linked', notMerge: false, lazyUpdate: true })
    await controller.render(props, theme, true)
    expect(mocks.init).toHaveBeenCalledWith(expect.anything(), theme, { renderer: 'svg' })
    expect(mocks.chart.setOption).toHaveBeenLastCalledWith(expect.anything(), { notMerge: false, lazyUpdate: true })
    expect(mocks.chart.showLoading).toHaveBeenCalledWith('default', expect.objectContaining({ text: 'Wait', textColor: 'navy' }))
    expect(mocks.connect).toHaveBeenCalledWith('linked')
    expect(mocks.chart.group).toBe('linked')
    await controller.render({ ...props, group: '', loading: false }, theme, true)
    expect(mocks.chart.group).toBe('')
    expect(mocks.chart.hideLoading).toHaveBeenCalled()
    controller.resize()
    expect(mocks.chart.resize).toHaveBeenCalledOnce()
  })
  it('applies the current full option once when the theme changes', async () => {
    const { controller } = setup()
    const props = resolveProps({ options: '{"title":{"text":"Retained"}}', notMerge: false })
    await controller.render(props, theme, true)
    const update = { ...props, options: '{"title":{"text":"Updated","subtext":"Current"}}' }
    await controller.render(update, theme, true)
    expect(mocks.chart.setOption).toHaveBeenLastCalledWith(expect.objectContaining({ title: { text: 'Updated', subtext: 'Current' } }), { notMerge: false, lazyUpdate: false })
    const changed = { ...theme, darkMode: true }
    await controller.render(update, changed, true)
    expect(mocks.chart.dispose).toHaveBeenCalledOnce()
    expect(mocks.init).toHaveBeenCalledTimes(2)
    expect(mocks.init).toHaveBeenLastCalledWith(expect.anything(), changed, { renderer: 'canvas' })
    expect(mocks.chart.setOption).toHaveBeenCalledTimes(3)
    expect(mocks.chart.setOption).toHaveBeenLastCalledWith(expect.objectContaining({ title: { text: 'Updated', subtext: 'Current' } }), { notMerge: false, lazyUpdate: false })
  })
  it('does not initialize after disconnect during a pending import', async () => {
    const { controller } = setup()
    const pending = controller.render(resolveProps({}), theme, true)
    controller.stop()
    await pending
    expect(mocks.init).not.toHaveBeenCalled()
  })
  it.each([true, false])('recreates on renderer changes from the current full option, notMerge=%s', async (notMerge) => {
    const { controller } = setup()
    const props = resolveProps({ options: '{"series":[{"id":"a","type":"pie","data":[1]}]}', notMerge })
    await controller.render(props, theme, true)
    const update = { ...props, options: '{"series":[{"id":"a","type":"pie","data":[2]}]}' }
    await controller.render(update, theme, true)
    mocks.chart.setOption.mockClear()
    await controller.render({ ...update, renderer: 'svg' }, theme, true)
    expect(mocks.chart.dispose).toHaveBeenCalledOnce()
    expect(mocks.init).toHaveBeenLastCalledWith(expect.anything(), theme, { renderer: 'svg' })
    expect(mocks.chart.setOption).toHaveBeenCalledOnce()
    expect(mocks.chart.setOption.mock.calls[0]?.[0].series).toEqual([{ id: 'a', type: 'pie', data: [2] }])
  })
  it('accepts long update streams and rebuilds once from only the latest option', async () => {
    const { controller, emit } = setup()
    for (let i = 0; i < 1100; i++)
      await controller.render(resolveProps({ options: JSON.stringify({ title: { text: String(i) } }), notMerge: false }), theme, true)
    expect(mocks.chart.dispose).not.toHaveBeenCalled()
    mocks.chart.setOption.mockClear()
    await controller.render(resolveProps({ options: '{"title":{"text":"1099"}}', notMerge: false }), { ...theme, darkMode: true }, true)
    expect(mocks.chart.setOption).toHaveBeenCalledOnce()
    expect(mocks.chart.setOption.mock.calls[0]?.[0].title).toEqual({ text: '1099' })
    expect(emit).not.toHaveBeenCalledWith('chart-error', expect.anything())
  })
  it.each([true, false])('latest full option wins while the import is pending, notMerge=%s', async (notMerge) => {
    const { controller } = setup()
    await Promise.all([
      controller.render(resolveProps({ options: '{"title":{"text":"old"}}', notMerge }), theme, true),
      controller.render(resolveProps({ options: '{"title":{"text":"new"}}', notMerge }), theme, true),
    ])
    expect(mocks.chart.setOption).toHaveBeenCalledOnce()
    expect(mocks.chart.setOption).toHaveBeenCalledWith(expect.objectContaining({ title: { text: 'new' } }), expect.anything())
  })
})
