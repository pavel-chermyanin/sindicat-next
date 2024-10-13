
import {chartClient} from "@/fsd/shared/config/chartClient";
import {GroupPaths} from "../group.paths";


export const getGroups = async (report_id:number) => {
  const response = await chartClient.get(`${GroupPaths.GET_GROUPS}${report_id}`)
  return response.data
}