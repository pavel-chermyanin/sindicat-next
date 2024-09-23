

import type {ChartFormatting} from '../types/chart-formatting.types'
import {apiClient} from "@/fsd/shared/config/apiClient";
import {ChartPaths} from "@/fsd/entities/chart/chart.paths";
import {GetChartsFilterData} from "@/fsd/entities/filter";
import {chartClient} from "@/fsd/shared/config/chartClient";



type GetChartsDataProps = {
  group_id: number
  filter_data?: GetChartsFilterData[]
}


export const getChartsData = async ({group_id, filter_data = []}: GetChartsDataProps) => {
  const response = await chartClient.post(`${ChartPaths.GET_CHARTS_DATA}${group_id}`, {filter_data: filter_data})
  return response.data
}


export const getChartsFormatting = async (group_id: number) => {
  const response = await chartClient.get(`${ChartPaths.GET_CHARTS_FORMATTING}${group_id}`)
  return response.data
}