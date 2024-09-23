import {BarChartFormatting} from "./bar-chart.types";

export type ChartFormatting = {
  id: number
  title: string
  description: string
  ispercent: boolean
  formatting:BarChartFormatting
}

