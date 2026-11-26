import { describe, expect, it } from 'vitest'
import { legendDetail, zoomDetail } from './event-detail'

describe('event details', () => {
  it('copies the legend selection map and ignores invalid values', () => {
    const selected = { Sales: true, Profit: false }
    const detail = legendDetail({ selected })
    expect(detail).toEqual({ selected })
    expect(detail.selected).not.toBe(selected)
    expect(legendDetail({ selected: { invalid: 42 } })).toEqual({ selected: {} })
  })
  it('maps direct and batch zoom events', () => {
    expect(zoomDetail({ start: 0, end: 80 })).toEqual({ start: 0, end: 80 })
    expect(zoomDetail({ batch: [{ start: 20, end: 90 }] })).toEqual({ start: 20, end: 90 })
    expect(zoomDetail({ startValue: 20, endValue: 40 })).toEqual({ start: null, end: null })
    expect(zoomDetail(null)).toEqual({ start: null, end: null })
  })
})
