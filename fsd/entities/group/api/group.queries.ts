import {useQuery} from "@tanstack/react-query";
import {getGroups} from "./group.actions";
import {Group} from "../model/group.types";


export const useGetGroupsQueries = (report_id: number) => {
  return useQuery({
    queryKey: ['group', report_id],
    queryFn: () => getGroups(report_id),
    select: data => data as Group[],
    enabled: !!report_id
  })
}
