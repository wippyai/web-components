import { describe, expect, it } from 'vitest'
import { buildTheme, DEFAULT_PALETTE, loadingStyle } from './theme'

function style(values: Record<string, string> = {}) {
  return { getPropertyValue: (key: string) => values[key] ?? '', fontFamily: 'Test Font, sans-serif', color: 'rgb(10, 20, 30)' }
}

describe('buildTheme', () => {
  it('uses host text, secondary text, borders, font and transparent background', () => {
    const theme = buildTheme(style({
      '--p-text-color': ' white ', '--p-text-muted-color': ' silver ', '--p-content-border-color': ' gray ',
    }))
    expect(theme.textStyle).toEqual({ color: 'white', fontFamily: 'Test Font, sans-serif' })
    expect(theme.backgroundColor).toBe('transparent')
    expect(theme.legend.textStyle.color).toBe('white')
    for (const axis of [theme.categoryAxis, theme.valueAxis, theme.timeAxis, theme.logAxis]) {
      expect(axis.axisLabel.color).toBe('silver')
      expect(axis.axisLine.lineStyle.color).toBe('gray')
      expect(axis.splitLine.lineStyle.color).toBe('gray')
    }
  })

  it('uses the exact default palette when no overrides are resolved', () => {
    expect(buildTheme(style()).color).toEqual([
      '#2563EB', '#0D9488', '#7C3AED', '#DB2777', '#0891B2', '#65A30D', '#9333EA', '#D55E00',
    ])
  })

  it('overrides each resolved palette slot independently', () => {
    const theme = buildTheme(style({ '--wippy-chart-1': ' navy ', '--wippy-chart-3': '  ', '--wippy-chart-8': 'teal' }))
    expect(theme.color).toEqual(['navy', ...DEFAULT_PALETTE.slice(1, 7), 'teal'])
  })

  it('keeps the vermillion replacement above 3:1 contrast on both chart surfaces', () => {
    function luminance(hex: string) {
      const rgb = (hex.slice(1).match(/../g) ?? []).map(channel => parseInt(channel, 16) / 255)
        .map(channel => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
      return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722
    }
    const color = luminance(DEFAULT_PALETTE[7])
    for (const surface of ['#FFFFFF', '#1c1a19']) {
      const background = luminance(surface)
      expect((Math.max(color, background) + 0.05) / (Math.min(color, background) + 0.05)).toBeGreaterThanOrEqual(3)
    }
  })

  it('rebuilds from new computed CSS and falls back to computed text', () => {
    expect(buildTheme(style()).textStyle.color).toBe('rgb(10, 20, 30)')
    expect(buildTheme(style({ '--p-text-color': 'black' })).textStyle.color).toBe('black')
  })

  it('gives an explicit palette precedence over CSS and fallback colors', () => {
    expect(buildTheme(style({ '--wippy-chart-1': 'navy' }), ['orange', 'teal']).color).toEqual(['orange', 'teal'])
  })

  it('uses host surfaces and fonts for tooltip, calendar and loading in both modes', () => {
    for (const dark of [false, true]) {
      const theme = buildTheme(style({ '--p-content-background': 'surface', '--p-text-color': 'text',
        '--p-text-muted-color': 'muted', '--p-content-border-color': 'border', '--p-font-family': 'Host Font' }), undefined, dark)
      expect(theme.darkMode).toBe(dark)
      expect(theme.tooltip).toEqual({ backgroundColor: 'surface', borderColor: 'border', textStyle: { color: 'text' } })
      expect(theme.calendar.itemStyle).toEqual({ color: 'surface', borderColor: 'border' })
      expect(theme.radar.axisName.color).toBe('muted')
      expect(loadingStyle(theme, 'Wait')).toEqual({ text: 'Wait', color: DEFAULT_PALETTE[0], textColor: 'text', maskColor: 'surface', fontFamily: 'Host Font' })
    }
  })
})
