import {loginClient} from "@/fsd/shared/config/loginClient";
import {UserPaths} from "./user.paths";


export const me = async () => {
  const response = await loginClient.get(UserPaths.me)
  return response.data
}