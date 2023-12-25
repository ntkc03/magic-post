import axios, { AxiosRequestConfig } from "axios";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import apiConfig from "../../../../utils/apiConfig";
import { ConsolidationInterface } from "../../../../types/ConsolidationInterface";

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

  export const getConsolidationByAddress = async (address: string): Promise<any> => {
    try {
      const config: AxiosRequestConfig = {
        url: `${apiConfig.consolidationAddress}/${address}`,
        method: "get",
      };
      const response = await api(config);
      return response.data;
    } catch (error) {
      throw new Error("error getting consolidations");
    }
  };


  export const updateConsolidation = async (payload: ConsolidationInterface): Promise<any> => {
    try {
      const config: AxiosRequestConfig = {
      url: `${apiConfig.updateConsolidation}`,
      method: "put",
      data: payload,
      };
      const response = await axios(config);
      return response.data;
    } catch (error) {
      throw new Error("error while updating user");
    }
  };