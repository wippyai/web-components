import { afterEach, describe, expect, it, vi } from 'vitest'
import type { EChartsCoreOption } from 'echarts/core'
import { colorWithAlpha } from './colors'
import { withFormatters } from './formatters'
import { buildTheme, DEFAULT_PALETTE } from './theme'

const theme = buildTheme({ getPropertyValue: (key: string) => ({
  '--p-text-color': '#102030', '--p-text-muted-color': '#405060',
  '--p-content-border-color': '#708090', '--p-content-background': '#a0b0c0',
})[key] ?? '', color: '#111111', fontFamily: 'sans-serif' }, ['#123456', '#abcdef'])

function resolve(option: unknown, currentTheme = theme) {
  return withFormatters(option as EChartsCoreOption, 'en-US', currentTheme)
}

afterEach(() => vi.restoreAllMocks())

describe('theme color markers', () => {
  it.each([
    ['text', 'rgba(16, 32, 48, 1)'], ['muted', 'rgba(64, 80, 96, 1)'],
    ['border', 'rgba(112, 128, 144, 1)'], ['surface', 'rgba(160, 176, 192, 1)'],
  ])('resolves %s in title and graphic colors', (key, expected) => {
    expect(resolve({ title: { textStyle: { color: { $themeColor: key } } },
      graphic: [{ style: { fill: { $themeColor: key } } }] })).toEqual({
      title: { textStyle: { color: expected } }, graphic: [{ style: { fill: expected } }],
    })
  })
  it('uses theme alpha and replaces existing CSS alpha', () => {
    expect(resolve({ color: { $themeColor: 'border', alpha: 0.5 } }).color).toBe('rgba(112, 128, 144, 0.5)')
    expect(colorWithAlpha('rgba(10, 20, 30, 0)', 0.6)).toBe('rgba(10, 20, 30, 0.6)')
    expect(colorWithAlpha('#12345600', 0)).toBe('rgba(18, 52, 86, 0)')
    expect(colorWithAlpha('hsl(120, 100%, 50%)', 1)).toBe('rgba(0, 255, 0, 1)')
  })
})

describe('series color markers', () => {
  it('uses series index modulo the owning palette and does not mutate input', () => {
    const option = { series: Array.from({ length: 3 }, () => ({ lineStyle: { shadowColor: { $seriesColor: { alpha: 0.6 } } } })) }
    const json = JSON.stringify(option)
    expect(resolve(option).series).toEqual([
      { itemStyle: { color: '#123456' }, lineStyle: { shadowColor: 'rgba(18, 52, 86, 0.6)' } },
      { itemStyle: { color: '#abcdef' }, lineStyle: { shadowColor: 'rgba(171, 205, 239, 0.6)' } },
      { itemStyle: { color: '#123456' }, lineStyle: { shadowColor: 'rgba(18, 52, 86, 0.6)' } },
    ])
    expect(JSON.stringify(option)).toBe(json)
  })
  it('uses the documented palette when no palette or CSS slots are set', () => {
    const fallback = buildTheme({ getPropertyValue: () => '', color: '#111111', fontFamily: 'sans-serif' })
    expect(resolve({ series: { itemStyle: { color: { $seriesColor: {} } } } }, fallback).series)
      .toEqual({ itemStyle: { color: colorWithAlpha(DEFAULT_PALETTE[0], 1) } })
  })
  it('prefers series itemStyle then lineStyle strings, even in nested data items', () => {
    const data = [{ value: 1, itemStyle: { color: '#000000', shadowColor: { $seriesColor: {} } } }]
    expect(resolve({ series: [
      { itemStyle: { color: '#ff0000' }, lineStyle: { color: '#00ff00' }, data },
      { lineStyle: { color: '#0000ff' }, data },
      { itemStyle: { color: { $seriesColor: {} } }, lineStyle: { color: '#00ff00' }, data },
    ] }).series).toEqual([
      { itemStyle: { color: '#ff0000' }, lineStyle: { color: '#00ff00' }, data: [{ value: 1, itemStyle: { color: '#000000', shadowColor: 'rgba(255, 0, 0, 1)' } }] },
      { itemStyle: { color: '#0000ff' }, lineStyle: { color: '#0000ff' }, data: [{ value: 1, itemStyle: { color: '#000000', shadowColor: 'rgba(0, 0, 255, 1)' } }] },
      { itemStyle: { color: 'rgba(0, 255, 0, 1)' }, lineStyle: { color: '#00ff00' }, data: [{ value: 1, itemStyle: { color: '#000000', shadowColor: 'rgba(0, 255, 0, 1)' } }] },
    ])
  })
  it.each(['vertical', 'horizontal'])('creates a %s area gradient', (direction) => {
    expect(resolve({ series: { areaStyle: { color: { $seriesGradient: { from: 0.6, to: 0, direction } } } } }).series).toEqual({
      itemStyle: { color: '#123456' },
      areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: direction === 'horizontal' ? 1 : 0,
        y2: direction === 'vertical' ? 1 : 0, colorStops: [
          { offset: 0, color: 'rgba(18, 52, 86, 0.6)' }, { offset: 1, color: 'rgba(18, 52, 86, 0)' },
        ] } },
    })
  })
  it('defaults gradient fields and resolves wrapped options and independent series lists', () => {
    const option = { baseOption: { series: [{ areaStyle: { color: { $seriesGradient: {} } } }] },
      media: [{ option: { series: [{}, { itemStyle: { color: { $seriesColor: {} } } }] } }] }
    expect(resolve(option)).toMatchObject({ baseOption: { series: [{ areaStyle: { color: {
      x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(18, 52, 86, 0.35)' }, { offset: 1, color: 'rgba(18, 52, 86, 0)' }],
    } } }] }, media: [{ option: { series: [{}, { itemStyle: { color: 'rgba(171, 205, 239, 1)' } }] } }] })
  })
  it.each([0, 1])('accepts alpha boundary %s', (alpha) => {
    expect(resolve({ series: { itemStyle: { color: { $seriesColor: { alpha } } } } }).series)
      .toEqual({ itemStyle: { color: `rgba(18, 52, 86, ${alpha})` } })
  })
})

describe('invalid color descriptors', () => {
  it.each([
    { $seriesColor: null }, { $seriesColor: [] }, { $seriesColor: 'red' },
    { $seriesColor: { alpha: -0.1 } }, { $seriesColor: { alpha: 1.1 } },
    { $seriesColor: { alpha: '0.5' } }, { $seriesColor: { alpha: null } },
    { $seriesColor: { alpha: NaN } }, { $seriesColor: { alpha: Infinity } },
    { $seriesColor: { extra: 1 } }, { $seriesColor: {}, extra: true },
    { $seriesGradient: null }, { $seriesGradient: [] },
    { $seriesGradient: { from: -1 } }, { $seriesGradient: { to: 2 } },
    { $seriesGradient: { from: '0.35' } }, { $seriesGradient: { to: null } },
    { $seriesGradient: { direction: 'diagonal' } }, { $seriesGradient: { direction: null } },
    { $seriesGradient: { extra: true } }, { $seriesGradient: {}, alpha: 0.5 },
    { $themeColor: 'unknown' }, { $themeColor: '__proto__' }, { $themeColor: {} },
    { $themeColor: 'border', alpha: 2 }, { $themeColor: 'text', extra: true },
    { $themeColor: 'text', $seriesColor: {} },
  ])('drops malformed marker %j with one warning', (marker) => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    expect(resolve({ series: { itemStyle: { color: marker } } }).series).toEqual({ itemStyle: {} })
    expect(warn).toHaveBeenCalledOnce()
  })
  it('preserves objects with undocumented dollar keys', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const option = { dataset: { source: [{ name: 'A', $revenue: 7, $unknown: {} }] } }
    expect(resolve(option)).toEqual(option)
    expect(warn).not.toHaveBeenCalled()
  })
  it('drops series markers outside a series and invalid source colors', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    expect(resolve({ title: { textStyle: { color: { $seriesColor: {} } } },
      series: { itemStyle: { color: 'invalid CSS color', shadowColor: { $seriesColor: {} } } } }))
      .toEqual({ title: { textStyle: {} }, series: { itemStyle: { color: 'invalid CSS color' } } })
    expect(warn).toHaveBeenCalledTimes(2)
  })
  it('keeps format descriptors atomic and never turns a color marker into a formatter', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const result = resolve({ series: { label: { formatter: { $format: { $seriesColor: {} } } },
      tooltip: { valueFormatter: { $themeColor: 'text' } },
      itemStyle: { color: { $seriesColor: {} } } },
    tooltip: { formatter: { $format: 'number:2' } } })
    expect(result.series).toEqual({ label: {}, tooltip: {}, itemStyle: { color: 'rgba(18, 52, 86, 1)' } })
    expect((result.tooltip as { formatter: (value: number) => string }).formatter(2)).toBe('2.00')
    expect(warn).toHaveBeenCalledTimes(2)
  })
  it('never executes code-looking marker values', () => {
    const execute = vi.fn()
    vi.stubGlobal('executeColorPayload', execute)
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    expect(resolve({ color: { $themeColor: 'globalThis.executeColorPayload()' } })).toEqual({})
    expect(execute).not.toHaveBeenCalled()
    vi.unstubAllGlobals()
  })
})
