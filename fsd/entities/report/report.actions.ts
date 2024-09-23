
import {ReportPaths} from "./report.paths";
import {chartClient} from "@/fsd/shared/config/chartClient";

export const getReports = async (client_id:number) => {
  const response = await chartClient.get(`${ReportPaths.GET_REPORTS}${client_id}`)
  return response.data
}