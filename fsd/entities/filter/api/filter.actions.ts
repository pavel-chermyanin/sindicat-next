import {FilterPaths} from "../filter.paths";
import {chartClient} from "@/fsd/shared/config/chartClient";
import {DependentFilterRequest} from "../model/filter.types";


export const getFilters = async (group_id: number) => {
  const response = await chartClient.get(`${FilterPaths.GET_FILTERS}${group_id}`)
  return response.data
}


type DependentFiltersProps = {
  group_id: number
  data: DependentFilterRequest
}
export const getDependentFilters = async ({group_id, data}: DependentFiltersProps) => {
  const response = await chartClient.post(`${FilterPaths.DEPENDENT_FILTERS}${group_id}`,data)
  return response.data
}