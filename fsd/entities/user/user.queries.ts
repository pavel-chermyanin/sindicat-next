import {useQuery} from "@tanstack/react-query";
import {me} from "./user.actions";

export const useUserMeQueries = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: me,
  })
}
