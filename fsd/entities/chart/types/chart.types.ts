import {BarChartType} from "@/fsd/entities/chart";
import {BarChartFormatting} from "./bar-chart.types";
import {TableChartType} from "./table-chart.types";

export type ChartDataType = BarChartType | TableChartType


export type ChartType = {
  chart:ChartDataType
  id: number
  title: string
  description: string
  ispercent: boolean
  formatting:BarChartFormatting
};

export type TypeChart = 'bar'| 'pie' | 'table'