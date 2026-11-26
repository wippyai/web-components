// Decorative categorical fallback, shared by light and dark modes. No severity meaning.
export const DEFAULT_PALETTE = [
  '#2563EB', '#0D9488', '#7C3AED', '#DB2777',
  '#0891B2', '#65A30D', '#9333EA', '#D55E00',
] as const

type ComputedStyle = Pick<CSSStyleDeclaration, 'getPropertyValue' | 'fontFamily' | 'color'>

export function buildTheme(style: ComputedStyle, palette?: string[], dark = false) {
  const get = (name: string, fallback: string) => style.getPropertyValue(name).trim() || fallback
  const text = get('--p-text-color', style.color)
  const muted = get('--p-text-muted-color', text)
  const border = get('--p-content-border-color', muted)
  const axis = {
    nameTextStyle: { color: muted },
    axisLabel: { color: muted },
    axisLine: { lineStyle: { color: border } },
    axisTick: { lineStyle: { color: border } },
    splitLine: { lineStyle: { color: border } },
  }
  return {
    darkMode: dark,
    backgroundColor: 'transparent',
    color: palette ?? DEFAULT_PALETTE.map((color, i) => get(`--wippy-chart-${i + 1}`, color)),
    textStyle: { color: text, fontFamily: get('--p-font-family', style.fontFamily) },
    title: { textStyle: { color: text }, subtextStyle: { color: muted } },
    tooltip: {
      backgroundColor: get('--p-content-background', 'transparent'),
      borderColor: border,
      textStyle: { color: text },
    },
    legend: { textStyle: { color: text }, inactiveColor: muted },
    categoryAxis: axis,
    valueAxis: axis,
    timeAxis: axis,
    logAxis: axis,
    line: { label: { color: text } },
    bar: { label: { color: text } },
    pie: { label: { color: text }, labelLine: { lineStyle: { color: border } } },
    radar: { axisName: { color: muted }, axisLine: { lineStyle: { color: border } }, splitLine: { lineStyle: { color: border } } },
    calendar: { itemStyle: { color: get('--p-content-background', 'transparent'), borderColor: border }, dayLabel: { color: muted }, monthLabel: { color: text }, yearLabel: { color: text } },
  }
}

export function loadingStyle(theme: ReturnType<typeof buildTheme>, text: string) {
  return {
    text,
    color: theme.color[0],
    textColor: theme.textStyle.color,
    maskColor: theme.tooltip.backgroundColor,
    fontFamily: theme.textStyle.fontFamily,
  }
}
