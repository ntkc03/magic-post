import { AxiosRequestConfig } from "axios";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import apiConfig from "../../../../utils/apiConfig";

const api = setupAxiosInterceptors();

export const allConsolidationsData = async (): Promise<any> => {
    try {
      const config: AxiosRequestConfig = {
        url: apiConfig.allConsolidations,
        method: "get",
      };
      const response = await api(config);
      return response?.data.allConsolidations;
    } catch (error) {
      throw new Error("error while getting consolidation data");
    }
  };