// Test inputs model values already supplied by the platform prop parser.
import pkg from '../package.json'
import type { ComponentProps } from './types'
import { resolveProps } from './props'

export function componentProps(overrides: Partial<ComponentProps> = {}): ComponentProps {
  const defaults = Object.fromEntries(Object.entries(pkg.wippy.props.properties)
    .map(([key, schema]) => [key.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase()), schema.default]))
  return { ...defaults, ...overrides } as ComponentProps
}

export const resolvedProps = (overrides: Partial<ComponentProps> = {}) => resolveProps(componentProps(overrides))
