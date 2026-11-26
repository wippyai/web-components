import { init, connect, use } from 'echarts/core'
import { LineChart, BarChart, PieChart, ScatterChart, HeatmapChart, FunnelChart, GaugeChart, RadarChart } from 'echarts/charts'
import {
  GridComponent, TooltipComponent, LegendComponent, DatasetComponent, AriaComponent,
  TitleComponent, DataZoomInsideComponent, DataZoomSliderComponent,
  MarkLineComponent, MarkPointComponent, MarkAreaComponent, VisualMapComponent,
  CalendarComponent, RadarComponent,
} from 'echarts/components'
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers'

use([
  LineChart, BarChart, PieChart, ScatterChart, HeatmapChart, FunnelChart, GaugeChart, RadarChart,
  GridComponent, TooltipComponent, LegendComponent, DatasetComponent, AriaComponent, TitleComponent,
  DataZoomInsideComponent, DataZoomSliderComponent, MarkLineComponent, MarkPointComponent,
  MarkAreaComponent, VisualMapComponent, CalendarComponent, RadarComponent, CanvasRenderer, SVGRenderer,
])

export { init, connect }
export { withFormatters } from '../formatters'
