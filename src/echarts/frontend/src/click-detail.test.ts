import { describe, expect, it } from 'vitest'
import { toClickDetail } from './click-detail'

const hit = { componentType: 'series', seriesIndex: 1, dataIndex: 2, seriesName: 'Sales', name: 'Q3' }

describe('toClickDetail', () => {
  it('matches chartjs detail keys for a category bar', () => {
    expect(toClickDetail({ ...hit, data: 7, value: 7 })).toEqual({
      label: 'Q3', datasetLabel: 'Sales', datasetIndex: 1, dataIndex: 2, value: 7,
    })
  })

  it('keeps the raw pie data object', () => {
    const raw = { name: 'Q3', value: 7, itemStyle: { color: 'blue' } }
    expect(toClickDetail({ ...hit, data: raw, value: 7 })?.value).toBe(raw)
    expect(toClickDetail({ ...hit, data: raw, value: 7, dimensionNames: ['value'], encode: {} })?.label).toBe('Q3')
  })

  it('uses a pie dataset category instead of its value dimension', () => {
    expect(toClickDetail({ ...hit, data: [7, 'Q3'], value: [7, 'Q3'], dimensionNames: ['sales', 'quarter'], encode: {} })?.label).toBe('Q3')
  })

  it('prefers an object x value, including zero, over a category label', () => {
    const raw = { x: 0, y: 7 }
    expect(toClickDetail({ ...hit, data: raw })?.label).toBe('0')
    expect(toClickDetail({ ...hit, data: raw })?.value).toBe(raw)
  })

  it('uses an encoded x dimension for tuples and dataset objects', () => {
    expect(toClickDetail({ ...hit, data: [7, '2026-01-01'], encode: { x: [1] } })?.label).toBe('2026-01-01')
    expect(toClickDetail({ ...hit, data: { month: 'Jan', sales: 7 }, encode: { x: [0] }, dimensionNames: ['month', 'sales'] })?.label).toBe('Jan')
  })

  it('defaults missing labels to empty strings', () => {
    expect(toClickDetail({ componentType: 'series', seriesIndex: 0, dataIndex: 0, data: null }))
      .toEqual({ label: '', datasetLabel: '', datasetIndex: 0, dataIndex: 0, value: null })
  })

  it.each([{}, { ...hit, componentType: 'legend' }, { ...hit, dataIndex: -1 }, { ...hit, seriesIndex: 0.5 }])(
    'ignores non-data clicks: %j', (event) => expect(toClickDetail(event)).toBeNull(),
  )
})
