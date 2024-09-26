import {useQuery} from "@tanstack/react-query";
import {getFilters} from "./filter.actions";


export const useGetFiltersQueries = (group_id: number) => {
  return useQuery({
    queryKey: ['filter', group_id],
    queryFn: () => getFilters(group_id),
    enabled: !!group_id,
  })
}

