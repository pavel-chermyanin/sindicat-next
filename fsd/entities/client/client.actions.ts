
import {ClientPaths} from "./client.paths";
import {chartClient} from "@/fsd/shared/config/chartClient";


export const getClients = async () => {
  const response = await chartClient.get(`${ClientPaths.GET_CLIENTS}`)
  return response.data;
}