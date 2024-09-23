import {useQuery} from "@tanstack/react-query";
import {getReports} from "./report.actions";
import {Report} from './report.types'

export const useGetReportsQueries = (client_id: number) => {
  return useQuery({
    queryKey: ['report', client_id],
    queryFn: () => getReports(client_id),
    select: data => data as Report[],
    enabled: !!client_id
  })
}
