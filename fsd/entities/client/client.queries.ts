import {useQuery} from "@tanstack/react-query";
import {getClients} from "./client.actions";
import {Client} from "./client.types";


export const useGetClientsQueries = () => {
  return useQuery({
    queryKey: ['client'],
    queryFn: getClients,
    select: data => data as Client[]
  })
}
