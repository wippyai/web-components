import { Model, time } from 'echarts/core'
import type { EChartsCoreOption } from 'echarts/core'
import { colorWithAlpha } from './colors'
import type { buildTheme } from './theme'

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

export function formatterLocale(doc = globalThis.document): string {
  for (const candidate of [doc?.documentElement.lang, globalThis.navigator?.language]) {
    if (!candidate?.trim())
      continue
    try {
      return new Intl.NumberFormat(candidate.trim()).resolvedOptions().locale
    }
    catch { /* An invalid document language falls back to the browser locale. */ }
  }
  return new Intl.NumberFormat().resolvedOptions().locale
}

/** Runs only after the engine import. JSON is data, never executable source. */
export function withFormatters(option: EChartsCoreOption, locale = formatterLocale(), theme?: ReturnType<typeof buildTheme>): EChartsCoreOption {
  const useUTC = (isObject(option.baseOption) ? option.baseOption.useUTC : option.useUTC) === true
  let timeLocale: Model | undefined
  function getTimeLocale() {
    if (!timeLocale) {
      const names = (field: 'month' | 'weekday', width: 'long' | 'short', count: number) => {
        const format = new Intl.DateTimeFormat(locale, { [field]: width, timeZone: 'UTC' })
        return Array.from({ length: count }, (_, i) => format.format(new Date(Date.UTC(2023, field === 'month' ? i : 0, field === 'month' ? 1 : i + 1))))
      }
      timeLocale = new Model({ time: {
        month: names('month', 'long', 12), monthAbbr: names('month', 'short', 12),
        dayOfWeek: names('weekday', 'long', 7), dayOfWeekAbbr: names('weekday', 'short', 7),
      } })
    }
    return timeLocale
  }

  function makeFormatter(spec: unknown) {
    if (typeof spec !== 'string')
      return undefined
    let numeric: Intl.NumberFormatOptions | undefined
    let dateOptions: Intl.DateTimeFormatOptions | undefined
    let template: string | undefined
    if (spec === 'number') numeric = {}
    else if (spec === 'compact') numeric = { notation: 'compact', maximumFractionDigits: 1 }
    else if (spec === 'percent') numeric = { style: 'percent', maximumFractionDigits: 1 }
    else if (spec === 'integer') numeric = { maximumFractionDigits: 0 }
    else if (/^number:(?:[0-9]|1[0-9]|20)$/.test(spec)) {
      const digits = Number(spec.slice(7))
      numeric = { minimumFractionDigits: digits, maximumFractionDigits: digits }
    }
    else if (spec === 'date') dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' }
    else if (spec === 'datetime') dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }
    else if (spec === 'month') dateOptions = { year: 'numeric', month: 'long' }
    else if (spec.startsWith('time:') && spec.length > 5) template = spec.slice(5)
    else return undefined

    const numberFormat = numeric && new Intl.NumberFormat(locale, numeric)
    const dateFormat = dateOptions && new Intl.DateTimeFormat(locale, { ...dateOptions, ...(useUTC ? { timeZone: 'UTC' } : {}) })
    const scalar = (value: unknown): string => {
      if (value === null || value === undefined || value === '')
        return ''
      if (typeof value !== 'number' && typeof value !== 'string' && !(value instanceof Date))
        return ''
      if (numberFormat) {
        const number = typeof value === 'number' ? value : typeof value === 'string' && value.trim() ? Number(value) : NaN
        return Number.isFinite(number) ? numberFormat.format(number) : String(value)
      }
      // ECharts parses date-only strings as local calendar dates, avoiding UTC day shifts.
      const date = time.parse(value)
      if (!Number.isFinite(date.getTime()))
        return String(value)
      return dateFormat ? dateFormat.format(date) : time.format(date, template ?? '', useUTC, getTimeLocale())
    }
    const callback = (input: unknown): string => {
      // Axis labels/valueFormatter receive values; pointer/series labels receive params.
      const value = isObject(input) && !(input instanceof Date) ? input.value : input
      // Multi-dimensional values retain all dimensions without guessing an encode mapping.
      return Array.isArray(value) ? value.map(callback).join(', ') : scalar(value)
    }
    return callback
  }

  const base = isObject(option.baseOption) ? option.baseOption : option
  const baseSeries: unknown[] = Array.isArray(base.series) ? base.series : base.series ? [base.series] : []
  type SeriesContext = { color: string | undefined, used: boolean }

  function walkSeries(value: unknown, index: number): unknown {
    if (!isObject(value)) return walk(value)
    // Media/timeline series lists may contain only an override for a later series.
    const matched = baseSeries.findIndex(candidate => isObject(candidate) && (
      value.id !== undefined ? candidate.id === value.id : value.name !== undefined && candidate.name === value.name))
    const baseIndex = matched >= 0 ? matched : index
    const original = baseSeries[baseIndex]
    let color: string | undefined
    for (const key of ['itemStyle', 'lineStyle']) {
      const own = value[key]
      const inherited = isObject(original) ? original[key] : undefined
      const paint = isObject(own) && own.color !== undefined ? own.color : isObject(inherited) ? inherited.color : undefined
      if (typeof paint === 'string') { color = paint; break }
    }
    const context: SeriesContext = { color: color ?? theme?.color[baseIndex % theme.color.length], used: false }
    const result = walk(value, context)
    // ECharts skips explicit colors when allocating its palette. Pin marker users
    // to the same color, including symbols when only lineStyle.color was supplied.
    if (context.used && context.color && isObject(result)) {
      const style = isObject(result.itemStyle) ? result.itemStyle : {}
      if (style.color === undefined) result.itemStyle = { ...style, color: context.color }
    }
    return result
  }

  const hasOnly = (value: Record<string, unknown>, keys: string[]) => Object.keys(value).every(key => keys.includes(key))
  const alpha = (value: unknown, fallback: number) => value === undefined ? fallback
    : typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 1 ? value : undefined

  function colorMarker(value: Record<string, unknown>, series: string | undefined): unknown {
    if ('$themeColor' in value && hasOnly(value, ['$themeColor', 'alpha']) && theme) {
      const colors = { text: theme.textStyle.color, muted: theme.categoryAxis.axisLabel.color,
        border: theme.tooltip.borderColor, surface: theme.tooltip.backgroundColor }
      const key = value.$themeColor
      const opacity = alpha(value.alpha, 1)
      if (typeof key === 'string' && Object.prototype.hasOwnProperty.call(colors, key) && opacity !== undefined)
        return colorWithAlpha(colors[key as keyof typeof colors], opacity)
    }
    if ('$seriesColor' in value && hasOnly(value, ['$seriesColor']) && isObject(value.$seriesColor) && series) {
      const spec = value.$seriesColor
      const opacity = alpha(spec.alpha, 1)
      if (hasOnly(spec, ['alpha']) && opacity !== undefined)
        return colorWithAlpha(series, opacity)
    }
    if ('$seriesGradient' in value && hasOnly(value, ['$seriesGradient']) && isObject(value.$seriesGradient) && series) {
      const spec = value.$seriesGradient
      const from = alpha(spec.from, 0.35)
      const to = alpha(spec.to, 0)
      const direction = spec.direction === undefined ? 'vertical' : spec.direction
      if (hasOnly(spec, ['from', 'to', 'direction']) && from !== undefined && to !== undefined
        && (direction === 'vertical' || direction === 'horizontal')) {
        const start = colorWithAlpha(series, from)
        const end = colorWithAlpha(series, to)
        if (start && end)
          return { type: 'linear', x: 0, y: 0, x2: direction === 'horizontal' ? 1 : 0,
            y2: direction === 'vertical' ? 1 : 0, colorStops: [{ offset: 0, color: start }, { offset: 1, color: end }] }
      }
    }
    return undefined
  }

  function walk(value: unknown, series?: SeriesContext, key = ''): unknown {
    if (Array.isArray(value))
      return value.map((child, index) => key === 'series' ? walkSeries(child, index) : walk(child, series))
    if (!isObject(value))
      return value
    if (Object.prototype.hasOwnProperty.call(value, '$format')) {
      const formatter = Object.keys(value).length === 1 ? makeFormatter(value.$format) : undefined
      if (!formatter)
        console.warn('[wippy-echarts] Ignored unsupported $format descriptor; using ECharts defaults.', value.$format)
      return formatter
    }
    if (['$seriesColor', '$seriesGradient', '$themeColor'].some(key => Object.prototype.hasOwnProperty.call(value, key))) {
      const resolved = key === 'formatter' || key === 'valueFormatter' ? undefined : colorMarker(value, series?.color)
      if (resolved === undefined)
        console.warn('[wippy-echarts] Ignored unsupported color descriptor; using ECharts defaults.')
      else if (series && ('$seriesColor' in value || '$seriesGradient' in value))
        series.used = true
      return resolved
    }
    return Object.fromEntries(Object.entries(value).flatMap(([childKey, child]) => {
      const next = childKey === 'series' && !Array.isArray(child) ? walkSeries(child, 0) : walk(child, series, childKey)
      return next === undefined ? [] : [[childKey, next]]
    }))
  }
  return walk(option) as EChartsCoreOption
}
