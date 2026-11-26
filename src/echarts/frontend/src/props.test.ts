import { describe, expect, it } from 'vitest'
import { booleanProp, parsePalette, resolveProps } from './props'

describe('props', () => {
  it('resolves every default', () => {
    expect(resolveProps({})).toEqual({ options: '', themeMode: 'auto', palette: undefined,
      renderer: 'canvas', autoresize: true, loading: false, loadingText: 'Loading…',
      notMerge: true, lazyUpdate: false, group: '', label: 'Chart', lazyInit: false })
  })
  it.each([true, '', 'true'])('parses true %s', value => expect(booleanProp(value, false)).toBe(true))
  it.each([false, 'false'])('parses false %s', value => expect(booleanProp(value, true)).toBe(false))
  it('uses defaults only for absent values', () => {
    expect(booleanProp(undefined, true)).toBe(true)
    expect(booleanProp(null, false)).toBe(false)
    expect(resolveProps({ renderer: 'svg', autoresize: false, loading: true, themeMode: 'dark',
      loadingText: 'Wait', notMerge: false, lazyUpdate: true, group: 'shared', label: 'Revenue', lazyInit: true }))
      .toMatchObject({ renderer: 'svg', autoresize: false, loading: true, themeMode: 'dark',
        loadingText: 'Wait', notMerge: false, lazyUpdate: true, group: 'shared', label: 'Revenue', lazyInit: true })
  })
  it('parses palette JSON without evaluating strings', () => {
    expect(parsePalette()).toBeUndefined()
    expect(parsePalette('[" navy ","var(--custom-color)"]')).toEqual(['navy', 'var(--custom-color)'])
  })
  it.each(['{', 'null', '{}', '[]', '[1]', '[""]', '["blue",false]'])('rejects invalid palette %s', value => {
    expect(() => parsePalette(value)).toThrow()
  })
})
