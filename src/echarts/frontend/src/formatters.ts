import { Model, time } from 'echarts/core'
import type { EChartsCoreOption } from 'echarts/core'

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
export function withFormatters(option: EChartsCoreOption, locale = formatterLocale()): EChartsCoreOption {
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

  function walk(value: unknown): unknown {
    if (Array.isArray(value))
      return value.map(walk)
    if (!isObject(value))
      return value
    if (Object.prototype.hasOwnProperty.call(value, '$format')) {
      const formatter = Object.keys(value).length === 1 ? makeFormatter(value.$format) : undefined
      if (!formatter)
        console.warn('[wippy-echarts] Ignored unsupported $format descriptor; using ECharts defaults.', value.$format)
      return formatter
    }
    return Object.fromEntries(Object.entries(value).flatMap(([childKey, child]) => {
      const next = walk(child)
      return next === undefined ? [] : [[childKey, next]]
    }))
  }
  return walk(option) as EChartsCoreOption
}
