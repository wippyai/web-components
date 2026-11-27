import { color } from 'echarts/core'

let context: CanvasRenderingContext2D | null | undefined

/** Normalize CSS colors to sRGB, replacing the source alpha with the requested alpha. */
export function colorWithAlpha(css: string, alpha: number): string | undefined {
  // ECharts handles legacy CSS colors without a DOM, including transparent colors.
  const parsed = color.parse(css)
  if (parsed?.every(Number.isFinite))
    return `rgba(${parsed[0]}, ${parsed[1]}, ${parsed[2]}, ${alpha})`
  if (typeof document === 'undefined')
    return undefined
  if (context === undefined) {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 1
    context = canvas.getContext('2d', { willReadFrequently: true, colorSpace: 'srgb' })
  }
  if (!context)
    return undefined
  // Relative RGB removes the original alpha before sampling, avoiding lost RGB
  // channels and premultiplication rounding for transparent oklch/color() input.
  const opaque = `rgb(from ${css} r g b / 1)`
  // Invalid fillStyle assignments are ignored. Two sentinels also accept a
  // legitimate color equal to either sentinel without accepting invalid input.
  context.fillStyle = '#010203'
  context.fillStyle = opaque
  if (context.fillStyle === '#010203') {
    context.fillStyle = '#040506'
    context.fillStyle = opaque
    if (context.fillStyle === '#040506')
      return undefined
  }
  context.clearRect(0, 0, 1, 1)
  context.fillRect(0, 0, 1, 1)
  const [r, g, b] = context.getImageData(0, 0, 1, 1).data
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
