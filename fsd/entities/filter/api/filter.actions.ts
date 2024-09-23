
import {FilterPaths} from "../filter.paths";
import {chartClient} from "@/fsd/shared/config/chartClient";



export const getFilters = async (group_id: number) => {
  const response = await chartClient.get(`${FilterPaths.GET_FILTERS}${group_id}`)
  return response.data
}