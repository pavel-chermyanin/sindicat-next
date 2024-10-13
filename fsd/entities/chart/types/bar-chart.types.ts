

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







