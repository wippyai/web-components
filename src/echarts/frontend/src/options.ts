import type { EChartsCoreOption } from 'echarts/core'

export type ParseResult = { option: EChartsCoreOption, error: null } | { option: null, error: string }

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

export function chartLabel(label: string, json: string): string {
  if (label.trim())
    return label.trim()
  const { option } = parseOptions(json)
  const title = option?.title ?? (isObject(option?.baseOption) ? option.baseOption.title : undefined)
  for (const item of Array.isArray(title) ? title : [title]) {
    if (isObject(item) && typeof item.text === 'string' && item.text.trim())
      return item.text.trim()
  }
  return 'Chart'
}

function safeLink(value: unknown): boolean {
  if (typeof value !== 'string')
    return false
  // URL parsing removes ASCII tabs/newlines and leading/trailing C0 controls.
  // Use the browser parser so obfuscated schemes receive the same treatment.
  try {
    return ['http:', 'https:', 'mailto:'].includes(new URL(value, 'https://wippy.invalid/').protocol)
  }
  catch {
    return false
  }
}

/** All JSON tooltip content is text. Never send caller strings to innerHTML. */
export function secureOptions(option: EChartsCoreOption): EChartsCoreOption {
  function walk(value: unknown, key = ''): unknown {
    if (Array.isArray(value))
      return value.map(child => walk(child, key))
    if (!isObject(value))
      return value
    const entries = Object.entries(value).flatMap(([childKey, child]) => {
      // ECharts 6.1 opens title.link/sublink and treemap/sunburst node links.
      // Guard every occurrence, including baseOption/media and nested data.
      if ((childKey === 'link' || childKey === 'sublink') && !safeLink(child)) {
        console.warn(`[wippy-echarts] Ignored unsafe ${childKey} URL.`)
        // Null also clears a previously merged link; omission would retain it.
        return [[childKey, null]]
      }
      return [[childKey, walk(child, childKey)]]
    })
    const result = Object.fromEntries(entries)
    // TooltipView chooses its renderer from the global tooltip, but enforce
    // this on every tooltip too, so nested overrides cannot reopen HTML sinks.
    return key === 'tooltip' ? { ...result, renderMode: 'richText' } : result
  }
  return walk(option) as EChartsCoreOption
}

export function parseOptions(json = ''): ParseResult {
  try {
    const option: unknown = json.trim() ? JSON.parse(json) : {}
    if (!isObject(option))
      throw new Error('Expected an ECharts option object')
    return { option, error: null }
  }
  catch (e) {
    return { option: null, error: `Invalid options JSON: ${(e as Error).message}` }
  }
}

/** Keep tooltips inside the owning chart and supply accessibility defaults. */
export function withDefaults(option: EChartsCoreOption): EChartsCoreOption {
  // ECharts ignores unit-option fields outside an explicit baseOption.
  if (isObject(option.baseOption))
    return { ...option, baseOption: withDefaults(option.baseOption as EChartsCoreOption) }
  const tooltipDefaults = (value: unknown) => {
    const tooltip = isObject(value) ? value : {}
    // Ignore caller append targets, which could escape the owning shadow root.
    const { appendTo: _appendTo, appendToBody: _appendToBody, ...rest } = tooltip
    return { confine: true, ...rest }
  }
  return {
    ...option,
    tooltip: Array.isArray(option.tooltip)
      ? option.tooltip.map(tooltipDefaults)
      : tooltipDefaults(option.tooltip),
    aria: { enabled: true, ...(isObject(option.aria) ? option.aria : {}) },
  }
}
