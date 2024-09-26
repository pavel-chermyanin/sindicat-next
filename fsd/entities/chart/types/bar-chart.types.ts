import {TypeChart} from "./chart.types";

export  type BarChartType = {
  graph_id: number
  seriesData:SeriesData
  xAxisData: XAxisData
}

type SeriesData = {
  [key: string]: SeriesDataValue;
}

type SeriesDataValue = number[];

type XAxisData = string[];

export type BarChartFormatting = {
  type_chart: TypeChart
  stack: 'total',
  isXAxis: boolean
}



