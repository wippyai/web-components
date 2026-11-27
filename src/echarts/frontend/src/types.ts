export interface ComponentProps {
  options: string
  themeMode: 'auto' | 'light' | 'dark'
  palette: string
  renderer: 'canvas' | 'svg'
  autoresize: boolean
  loading: boolean
  loadingText: string
  notMerge: boolean
  lazyUpdate: boolean
  group: string
  label: string
  lazyInit: boolean
}
