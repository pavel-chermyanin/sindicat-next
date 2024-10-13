
import {PivotChartType} from "./pivot-chart.types";
import {BarChartType} from "./bar-chart.types";
import {ChartFormatting} from "./chart-formatting.types";

export type ChartDataType = BarChartType | PivotChartType


export type ChartType = {
  chart:ChartDataType
  id: number
  title: string
  description: string
  ispercent: boolean
  formatting: ChartFormatting;
};

export type TypeChart = 'bar'| 'pie' | 'table' | 'pivot'