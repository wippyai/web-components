import { afterEach, describe, expect, it, vi } from 'vitest'
import { time } from 'echarts/core'
import type { EChartsCoreOption } from 'echarts/core'
import { formatterLocale, withFormatters } from './formatters'
import { parseOptions } from './options'

type Formatter = (value: unknown) => string
function format(spec: unknown, value: unknown, locale = 'en-US', useUTC = false) {
  const option = withFormatters({ useUTC, tooltip: { valueFormatter: { $format: spec } } } as EChartsCoreOption, locale)
  return ((option.tooltip as { valueFormatter: Formatter }).valueFormatter)(value)
}
afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks() })

describe('declarative formatter specs', () => {
  it.each([
    ['number', 12345.678, '12,345.678'], ['compact', 1400000, '1.4M'],
    ['percent', 0.123, '12.3%'], ['integer', 1234.6, '1,235'],
    ['number:0', 1234.6, '1,235'], ['number:2', 1234.5, '1,234.50'],
    ['number:20', 1, '1.00000000000000000000'],
  ])('formats %s', (spec, value, expected) => {
    expect(format(spec, value)).toBe(expected)
  })
  it('formats a date without time, preserving a date-only calendar value', () => {
    expect(format('date', '2026-11-20')).toBe('11/20/2026')
    expect(format('date', { value: '2026-11-20' })).toBe('11/20/2026')
  })
  it('formats datetime and month in the selected locale', () => {
    const date = new Date(2026, 10, 20, 13, 45, 30)
    expect(format('datetime', date)).toBe(new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }).format(date))
    expect(format('month', date)).toBe('November 2026')
    expect(format('month', date, 'pl-PL')).toBe(new Intl.DateTimeFormat('pl-PL', { year: 'numeric', month: 'long' }).format(date))
  })
  it('uses ECharts time tokens and localized month names', () => {
    const date = new Date(2026, 10, 20, 13, 45)
    const template = '{yyyy}-{MM}-{dd} {MMM} {HH}:{mm}'
    expect(format('time:' + template, date)).toBe(time.format(date, template, false, 'EN'))
    expect(format('time:{MMM} {yyyy}', date, 'pl-PL')).toBe(new Intl.DateTimeFormat('pl-PL', { month: 'short' }).format(date) + ' 2026')
  })
  it('respects useUTC for Intl dates and ECharts templates', () => {
    const timestamp = Date.UTC(2026, 10, 20, 23, 45)
    expect(format('time:{yyyy}-{MM}-{dd} {HH}:{mm}', timestamp, 'en-US', true)).toBe('2026-11-20 23:45')
    expect(format('date', timestamp, 'en-US', true)).toBe('11/20/2026')
  })
  it.each([true, false])('uses the effective baseOption useUTC=%s for dates and time templates', (useUTC) => {
    const timestamp = Date.UTC(2026, 10, 20, 23, 45)
    const converted = withFormatters({ useUTC: !useUTC, baseOption: { useUTC,
      tooltip: { valueFormatter: { $format: 'date' } },
      xAxis: { axisLabel: { formatter: { $format: 'time:{yyyy}-{MM}-{dd} {HH}:{mm}' } } },
    }, media: [{ option: { tooltip: { valueFormatter: { $format: 'datetime' } } } }] }, 'en-US')
    const base = converted.baseOption as { tooltip: { valueFormatter: Formatter }, xAxis: { axisLabel: { formatter: Formatter } } }
    expect(base.tooltip.valueFormatter(timestamp)).toBe(new Intl.DateTimeFormat('en-US', {
      year: 'numeric', month: 'numeric', day: 'numeric', ...(useUTC ? { timeZone: 'UTC' } : {}),
    }).format(timestamp))
    expect(base.xAxis.axisLabel.formatter(timestamp)).toBe(time.format(timestamp, '{yyyy}-{MM}-{dd} {HH}:{mm}', useUTC, 'EN'))
    const media = converted.media as { option: { tooltip: { valueFormatter: Formatter } } }[]
    const first = media[0]
    if (!first) throw new Error('Expected media formatter')
    expect(first.option.tooltip.valueFormatter(timestamp)).toBe(new Intl.DateTimeFormat('en-US', {
      year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', ...(useUTC ? { timeZone: 'UTC' } : {}),
    }).format(timestamp))
  })
  it('uses locale grouping and decimal separators', () => {
    expect(format('number:2', 1234.5, 'de-DE')).toBe('1.234,50')
    expect(format('percent', 0.123, 'de-DE')).toBe(new Intl.NumberFormat('de-DE', { style: 'percent', maximumFractionDigits: 1 }).format(0.123))
  })
  it('handles callback params, numeric strings, arrays, missing and invalid data', () => {
    expect(format('integer', { value: 1234.6 })).toBe('1,235')
    expect(format('number', '1234')).toBe('1,234')
    expect(format('number:2', [1, 2])).toBe('1.00, 2.00')
    expect(format('number:2', [{ value: [1, 2] }, { value: 3 }])).toBe('1.00, 2.00, 3.00')
    for (const value of [null, undefined, '', {}, { value: null }])
      expect(format('date', value)).toBe('')
    expect(format('date', 'bad date')).toBe('bad date')
    expect(format('number', 'bad number')).toBe('bad number')
    expect(format('number', Infinity)).toBe('Infinity')
  })
})

describe('formatter replacement walk', () => {
  it('replaces all formatter positions, including nested arrays and series lists, without mutating JSON', () => {
    const json = JSON.stringify({
      tooltip: { valueFormatter: { $format: 'number' }, axisPointer: { label: { formatter: { $format: 'date' } } } },
      xAxis: [{ axisLabel: { formatter: { $format: 'month' } }, axisPointer: { label: { formatter: { $format: 'date' } } } }],
      yAxis: { axisLabel: { formatter: { $format: 'integer' } } },
      axisPointer: { label: { formatter: { $format: 'date' } } },
      series: [{ label: { formatter: { $format: 'compact' } } }, { label: { formatter: { $format: 'percent' } }, data: [{ label: { formatter: { $format: 'integer' } } }] }],
      nested: [[{ formatter: { $format: 'number:2' } }]],
    })
    const original = JSON.parse(json)
    const result = withFormatters(original, 'en-US')
    let count = 0
    function visit(value: unknown) {
      if (typeof value === 'function') count++
      else if (value && typeof value === 'object') Object.values(value).forEach(visit)
    }
    visit(result)
    expect(count).toBe(10)
    expect(JSON.stringify(original)).toBe(json)
  })
  it.each(['unknown', 'number:-1', 'number:21', 'number:1.5', 'number:2junk', 'time:', '', 42, null])('ignores unsupported spec %s with a warning and omits the callback', (spec) => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const result = withFormatters({ tooltip: { valueFormatter: { $format: spec } }, series: [] } as EChartsCoreOption, 'en-US')
    expect(result).toEqual({ tooltip: {}, series: [] })
    expect(warn).toHaveBeenCalledOnce()
  })
  it('ignores malformed descriptors and preserves native time dictionaries and string templates', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    expect(withFormatters({ xAxis: { axisLabel: { formatter: { $format: 'date', extra: true } } } } as EChartsCoreOption, 'en-US')).toEqual({ xAxis: { axisLabel: {} } })
    const native = { xAxis: { axisLabel: { formatter: { year: '{yyyy}', month: '{MMM}' } } }, series: [{ label: { formatter: '{b}: {c}' } }] }
    expect(withFormatters(native, 'en-US')).toEqual(native)
  })
  it('never executes JSON strings or code-looking specs and templates', () => {
    const execute = vi.fn()
    vi.stubGlobal('executeFormatterPayload', execute)
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    const code = 'globalThis.executeFormatterPayload()'
    const parsed = parseOptions(JSON.stringify({
      tooltip: { formatter: code }, series: [{ label: { formatter: { $format: code } } }],
      title: { text: code },
    }))
    expect(parsed.error).toBeNull()
    if (!parsed.option) throw new Error(parsed.error)
    const result = withFormatters(parsed.option, 'en-US')
    expect(result.tooltip).toEqual({ formatter: code })
    expect(result.series).toEqual([{ label: {} }])
    expect(format('time:' + code, '2026-11-20')).toBe(code)
    expect(execute).not.toHaveBeenCalled()
    expect(Object.getPrototypeOf(withFormatters(JSON.parse('{"__proto__":{"polluted":true}}'), 'en-US'))).toBe(Object.prototype)
    expect({}).not.toHaveProperty('polluted')
  })
  it('keeps tooltip callback output as text for the enforced richText renderer', () => {
    const payload = '<img src=x onerror="globalThis.executeFormatterPayload()">'
    for (const spec of ['number', 'time:' + payload]) {
      const result = withFormatters({ tooltip: { formatter: { $format: spec } } } as EChartsCoreOption, 'en-US')
      const formatter = (result.tooltip as { formatter: Formatter }).formatter
      expect(formatter({ value: spec === 'number' ? payload : '2026-11-20' })).toBe(payload)
    }
  })
})

describe('formatter locale', () => {
  it('prefers document language and falls back to browser language', () => {
    vi.stubGlobal('navigator', { language: 'de-DE' })
    vi.stubGlobal('document', { documentElement: { lang: 'pl-PL' } })
    expect(formatterLocale()).toBe('pl-PL')
    expect(format('number:2', 1234.5, formatterLocale())).toBe(new Intl.NumberFormat('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(1234.5))
    vi.stubGlobal('document', { documentElement: { lang: '' } })
    expect(formatterLocale()).toBe('de-DE')
    vi.stubGlobal('document', { documentElement: { lang: 'invalid_locale!' } })
    expect(formatterLocale()).toBe('de-DE')
  })
  it('uses the runtime default without browser globals', () => {
    vi.stubGlobal('document', undefined)
    vi.stubGlobal('navigator', undefined)
    expect(formatterLocale()).toBe(new Intl.NumberFormat().resolvedOptions().locale)
  })
})
