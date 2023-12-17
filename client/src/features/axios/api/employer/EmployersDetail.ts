import { AxiosRequestConfig } from "axios";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import apiConfig from "../../../../utils/apiConfig";

const api = setupAxiosInterceptors();

export const allEmployersData = async (): Promise<any> => {
    try {
      const config: AxiosRequestConfig = {
        url: apiConfig.allEmployers,
        method: "get",
      };
      const response = await api(config);
      return response?.data.allEmployers;
    } catch (error) {
      throw new Error("error while getting consolidation data");
    }
  };