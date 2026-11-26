import { afterEach, describe, expect, it, vi } from 'vitest'
import { parseOptions, secureOptions, withDefaults } from './options'

afterEach(() => vi.restoreAllMocks())

describe('JSON option security', () => {
  it.each(['http://example.org', 'https://example.org', 'mailto:team@example.org', '/path', '../path', './path', 'path', '?a=1', '#section', '//example.org', 'HTTPS://example.org'])('retains safe links: %s', (link) => {
    const source = { title: [{ link, sublink: link }], series: [{ data: [{ link }] }] }
    expect(secureOptions(source)).toEqual(source)
  })
  it.each(['javascript:alert(1)', 'JaVaScRiPt:alert(1)', ' java\nscript:alert(1)', '\u0000javascript:alert(1)', 'data:text/html,<script>alert(1)</script>', 'vbscript:msgbox(1)', 'file:///C:/x', 'blob:https://example.org/id', 'ftp://example.org', 42, {}])('clears unsafe links with a warning: %s', (link) => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const source = { title: [{ link, sublink: link }], series: [{ data: [{ children: [{ link }] }] }], media: [{ option: { title: { link } } }] }
    expect(secureOptions(source)).toEqual({ title: [{ link: null, sublink: null }], series: [{ data: [{ children: [{ link: null }] }] }], media: [{ option: { title: { link: null } } }] })
    expect(warn).toHaveBeenCalledTimes(4)
    expect(source.title[0].link).toEqual(link)
  })
  it('enforces richText at every tooltip level without changing names or templates', () => {
    const formatter = '<img src=x onerror=alert(1)> {a} {b} {c}'
    const source = { tooltip: [{ renderMode: 'html', formatter }], series: [{ name: formatter, tooltip: { renderMode: 'html', formatter }, data: [{ name: formatter, tooltip: { formatter } }] }] }
    const result = secureOptions(source)
    expect(result).toEqual({ tooltip: [{ renderMode: 'richText', formatter }], series: [{ name: formatter, tooltip: { renderMode: 'richText', formatter }, data: [{ name: formatter, tooltip: { renderMode: 'richText', formatter } }] }] })
    expect(source.tooltip[0].renderMode).toBe('html')
  })
})

describe('parseOptions', () => {
  it('accepts an empty option and ordinary JSON', () => {
    expect(parseOptions().option).toEqual({})
    expect(parseOptions('  ').option).toEqual({})
    expect(parseOptions('{"series":[{"type":"bar","data":[1,2]}]}')).toEqual({
      option: { series: [{ type: 'bar', data: [1, 2] }] }, error: null,
    })
  })

  it.each(['{', 'null', '[]', '42', '"text"', '{"formatter": function () {}}'])(
    'reports invalid JSON or option shape: %s', (json) => {
      expect(parseOptions(json).option).toBeNull()
      expect(parseOptions(json).error).toMatch(/^Invalid options JSON:/)
    },
  )

  it('keeps code-looking JSON strings as strings', () => {
    const code = '(() => { throw new Error("must never run") })()'
    expect(parseOptions(JSON.stringify({ tooltip: { formatter: code } })).option)
      .toEqual({ tooltip: { formatter: code } })
  })
})

describe('withDefaults', () => {
  it('enables aria and confines tooltips without mutating the source', () => {
    const source = { series: [] }
    expect(withDefaults(source)).toEqual({ series: [], tooltip: { confine: true }, aria: { enabled: true } })
    expect(source).toEqual({ series: [] })
  })

  it('preserves explicit defaults and removes tooltip append targets', () => {
    expect(withDefaults({
      tooltip: { confine: false, appendTo: 'body', appendToBody: true, trigger: 'axis' },
      aria: { enabled: false },
    })).toEqual({ tooltip: { confine: false, trigger: 'axis' }, aria: { enabled: false } })
  })

  it('handles tooltip component arrays and preserves aria settings', () => {
    expect(withDefaults({ tooltip: [{}, { confine: false }], aria: { decal: { show: true } } }))
      .toEqual({ tooltip: [{ confine: true }, { confine: false }], aria: { enabled: true, decal: { show: true } } })
  })
})
