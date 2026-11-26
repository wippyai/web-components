export interface ChartClickDetail {
  label: string
  datasetLabel: string
  datasetIndex: number
  dataIndex: number
  value: unknown
}

export interface DataClick {
  componentType?: string
  seriesName?: string
  seriesIndex?: number
  dataIndex?: number
  name?: string
  data?: unknown
  value?: unknown
  encode?: { x?: number[] }
  dimensionNames?: string[]
}

export function toClickDetail(event: DataClick): ChartClickDetail | null {
  if (event.componentType !== 'series' || !Number.isInteger(event.seriesIndex)
    || !Number.isInteger(event.dataIndex) || (event.seriesIndex ?? -1) < 0 || (event.dataIndex ?? -1) < 0)
    return null

  const raw = event.data
  const point = raw !== null && typeof raw === 'object' && !Array.isArray(raw)
    ? raw as Record<string, unknown>
    : undefined
  const values = point?.value ?? event.value ?? raw
  const xIndex = event.encode?.x?.[0]
  const dimension = xIndex === undefined ? undefined : event.dimensionNames?.[xIndex]
  // Pie/dataset events also carry dimensionNames, but have no encoded x.
  // Their value dimension must not replace the named category.
  const x = point?.x ?? (Array.isArray(values) && (xIndex !== undefined || !event.name)
    ? values[xIndex ?? 0]
    : undefined)
    ?? (dimension ? point?.[dimension] : undefined)
  const label = x ?? event.name
  return {
    label: label === undefined || label === null ? '' : String(label),
    datasetLabel: event.seriesName ?? '',
    datasetIndex: event.seriesIndex as number,
    dataIndex: event.dataIndex as number,
    value: raw,
  }
}
