import {apiClient} from "@/fsd/shared/config/apiClient";
import {Filter} from "./model/filter.types";
import {FilterPaths} from "./filter.paths";


export const getFilters = async ({group_id}:{group_id: number}): Promise<Filter[]> => {
  const data = await apiClient(`${FilterPaths.GET_FILTERS}${group_id}`, {revalidate:30});
  return data || [];
}