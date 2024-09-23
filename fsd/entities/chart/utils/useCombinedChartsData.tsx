import { useChartsData, useChartsDataFormat } from '../api/chart.queries';
import {GetChartsFilterData} from "@/fsd/entities/filter";
import {ChartType} from "@/fsd/entities/chart"; // Путь к вашим хукам

export const useCombinedChartsData = (groupId: number, filterData: GetChartsFilterData[]) => {

  const { data: chartsData, isLoading: isLoadingChartsData, error: errorChartsData } = useChartsData(groupId, filterData);
  const { data: chartsDataFormat, isLoading: isLoadingChartsDataFormat, error: errorChartsDataFormat } = useChartsDataFormat(groupId);

  const isLoading = isLoadingChartsData || isLoadingChartsDataFormat;
  const error = errorChartsData || errorChartsDataFormat;
  // console.log(chartsData)
  const combinedData:ChartType[] = (chartsData && chartsDataFormat) ?
    chartsData.map((chart, index) => ({ chart, ...chartsDataFormat[index] })) :
    [];

  return { data: combinedData, isLoading, error };
};
