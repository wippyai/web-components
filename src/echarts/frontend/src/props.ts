import type { ComponentProps } from './types'

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
    ...props,
    palette: parsePalette(props.palette),
  }
}

export type ResolvedProps = ReturnType<typeof resolveProps>
