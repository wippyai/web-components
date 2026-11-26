import type { ComponentProps } from './types'

export function booleanProp(value: unknown, fallback: boolean): boolean {
  if (value === undefined || value === null)
    return fallback
  return value === true || value === '' || value === 'true'
}

export function parsePalette(json = ''): string[] | undefined {
  if (!json.trim())
    return undefined
  const value: unknown = JSON.parse(json)
  if (!Array.isArray(value) || !value.length || !value.every(color => typeof color === 'string' && color.trim()))
    throw new Error('Palette must be a non-empty JSON array of colors')
  return value.map(color => color.trim())
}

export function resolveProps(props: ComponentProps) {
  return {
    options: props.options ?? '',
    themeMode: props.themeMode ?? 'auto',
    palette: parsePalette(props.palette),
    renderer: props.renderer ?? 'canvas',
    autoresize: booleanProp(props.autoresize, true),
    loading: booleanProp(props.loading, false),
    loadingText: props.loadingText ?? 'Loading…',
    notMerge: booleanProp(props.notMerge, true),
    lazyUpdate: booleanProp(props.lazyUpdate, false),
    group: props.group ?? '',
    label: props.label ?? 'Chart',
    lazyInit: booleanProp(props.lazyInit, false),
  }
}

export type ResolvedProps = ReturnType<typeof resolveProps>
