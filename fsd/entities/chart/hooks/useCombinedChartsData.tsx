import {useChartsData, useChartsDataFormat} from '../api/chart.queries';
import {GetChartsFilterData} from "@/fsd/entities/filter";
import {ChartDataType, ChartType} from "../types/chart.types";
import {ChartFormatting, PivotChartType} from "@/fsd/entities/chart";

export const useCombinedChartsData = (groupId: number, filterData: GetChartsFilterData[]) => {
  const {data: chartsData, isLoading: isLoadingChartsData, error: errorChartsData} = useChartsData(groupId, filterData);
  const {
    data: chartsDataFormat,
    isLoading: isLoadingChartsDataFormat,
    error: errorChartsDataFormat
  } = useChartsDataFormat(groupId);

  const isLoading = isLoadingChartsData || isLoadingChartsDataFormat;
  const error = errorChartsData || errorChartsDataFormat;

  const combinedData: ChartType[] = (chartsData && chartsDataFormat)
    ? chartsData.map((chart, index) => {
      let chartTemp: ChartDataType = chart;
      const format = chartsDataFormat[index];


      // Приводим к unknown, а затем проверяем тип
      if (format.formatting.type_chart === 'pivot' && (chartTemp as unknown as { '0': PivotChartType })) {
        chartTemp = (chartTemp as unknown as { '0': PivotChartType })["0"];
      }

      // Возвращаем объект с полным набором полей, включая formatting
      return {
        chart: chartTemp,
        ...format, // Добавляем formatting
      };
    })
    : [];

  return { data: combinedData, isLoading, error };
};
