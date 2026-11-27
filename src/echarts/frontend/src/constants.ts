import { useProps, useEvents, usePropsErrors } from '@wippy-fe/webcomponent-vue'
import type { ComponentProps } from './types.ts'
import type { ChartClickDetail } from './click-detail.ts'

export interface Events {
  load: undefined
  unload: undefined
  error: { message: string, error: unknown }
  invalid: { message: string }
  'chart-click': ChartClickDetail
  'chart-dblclick': ChartClickDetail
  'chart-hover': ChartClickDetail
  'legend-change': { selected: Record<string, boolean> }
  datazoom: { start: number | null, end: number | null }
  'chart-rendered': Record<string, never>
  'chart-error': { message: string }
}

export const useComponentProps = () => useProps<ComponentProps>()
export const useComponentEvents = () => useEvents<Events>()
export const useComponentPropsErrors = usePropsErrors
