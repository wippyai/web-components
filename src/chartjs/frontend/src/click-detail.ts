export interface ChartClickDetail {
  label: string
  datasetLabel: string
  datasetIndex: number
  dataIndex: number
  value: unknown
}

interface ClickedDataset {
  label?: string
  data?: unknown[]
}

interface ClickedData {
  labels?: unknown[]
  datasets?: ClickedDataset[]
}

/**
 * Map a Chart.js hit (dataset index + data index) to the `chart-click` detail.
 * `label` is the x label of the element: the category label for category
 * charts, the raw x for point charts (scatter, bubble). `value` is the raw
 * data point (a number, or the {x, y} / {x, y, r} object for point charts).
 */
export function toClickDetail(
  data: ClickedData,
  datasetIndex: number,
  dataIndex: number,
): ChartClickDetail {
  const dataset = data.datasets?.[datasetIndex]
  const raw = dataset?.data?.[dataIndex]
  const category = data.labels?.[dataIndex]
  const rawX = raw !== null && typeof raw === 'object' ? (raw as { x?: unknown }).x : undefined
  // A point's own x wins over the shared labels array, so scatter, bubble and {x, y} data report their x.
  const label = rawX ?? category
  return {
    label: label === undefined || label === null ? '' : String(label),
    datasetLabel: dataset?.label ?? '',
    datasetIndex,
    dataIndex,
    value: raw,
  }
}
