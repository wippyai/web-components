// @vitest-environment happy-dom
import { describe, expect, it, vi } from 'vitest'
import { parseProps } from '@wippy-fe/webcomponent-core'
import type { WippyPropsSchema } from '@wippy-fe/webcomponent-core'
import pkg from '../package.json'
import type { ComponentProps } from './types'
import { parsePalette, resolveProps } from './props'

vi.hoisted(() => {
  // The real core is external to Vitest and imports the real proxy entry.
  Object.assign(window, { __WIPPY_APP_API__: {}, __WIPPY_APP_CONFIG__: {} })
})

describe('props', () => {
  function parsed(attributes: Record<string, string> = {}) {
    const element = document.createElement('div')
    for (const [key, value] of Object.entries(attributes))
      element.setAttribute(key, value)
    const result = parseProps(element, pkg.wippy.props as WippyPropsSchema)
    expect(result.errors).toEqual([])
    return result.props as unknown as ComponentProps
  }
  it('preserves schema defaults supplied by the platform', () => {
    const props = parsed()
    expect(props).toMatchObject({ autoresize: true, loading: false, notMerge: true, lazyUpdate: false, label: '' })
    expect(resolveProps(props)).toEqual({ ...props, palette: undefined })
  })
  it.each(['', 'true', 'false'])('consumes platform booleans for attribute %s', value => {
    const props = parsed({ autoresize: value, loading: value, 'not-merge': value, 'lazy-update': value, 'lazy-init': value })
    expect(resolveProps(props)).toMatchObject({ autoresize: value !== 'false', loading: value !== 'false',
      notMerge: value !== 'false', lazyUpdate: value !== 'false', lazyInit: value !== 'false' })
  })
  it('parses palette JSON without evaluating strings', () => {
    expect(parsePalette()).toBeUndefined()
    expect(parsePalette('[" navy ","var(--custom-color)"]')).toEqual(['navy', 'var(--custom-color)'])
  })
  it.each(['{', 'null', '{}', '[]', '[1]', '[""]', '["blue",false]'])('rejects invalid palette %s', value => {
    expect(() => parsePalette(value)).toThrow()
  })
})
