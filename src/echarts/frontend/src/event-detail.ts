function record(value: unknown): Record<string, unknown> {
  return value !== null && typeof value === 'object' ? value as Record<string, unknown> : {}
}

export function legendDetail(event: unknown) {
  const selected = record(record(event).selected)
  return { selected: Object.fromEntries(Object.entries(selected).filter((entry): entry is [string, boolean] => typeof entry[1] === 'boolean')) }
}

export function zoomDetail(event: unknown) {
  const payload = record(event)
  const zoom = Array.isArray(payload.batch) ? record(payload.batch[0]) : payload
  // Value-based actions can omit percentages. Preserve that distinction.
  return { start: typeof zoom.start === 'number' ? zoom.start : null, end: typeof zoom.end === 'number' ? zoom.end : null }
}
