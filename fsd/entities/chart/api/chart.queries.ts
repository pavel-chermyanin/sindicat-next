import { useQuery } from '@tanstack/react-query';
import {ChartFormatting, ChartType, getChartsData, getChartsFormatting} from '@/fsd/entities/chart';
import {GetChartsFilterData} from "@/fsd/entities/filter";
import {ChartDataType} from "../types/chart.types";

export const useChartsData = (groupId: number, filterData: GetChartsFilterData[]) => {

  return useQuery({
    queryKey: ['chart', { group_id: groupId, filter_data: filterData }],
    queryFn: () => getChartsData({ group_id: groupId, filter_data: filterData }),
    enabled: !!groupId,
    select:data => data as ChartDataType[]
  });
};

export const useChartsDataFormat = (groupId: number) => {
  return useQuery({
    queryKey: ['chart', groupId],
    queryFn: () => getChartsFormatting(groupId),
    enabled: !!groupId,
    select:data => data as ChartFormatting[]
  });
};
