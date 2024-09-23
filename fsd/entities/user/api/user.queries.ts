import {useQuery} from "@tanstack/react-query";
import {me} from "./user.actions";
import {User} from "../model/user.types";

export const useUserMeQueries = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: me,
    select: data => data as User,
  })
}
