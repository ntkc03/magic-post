import { AxiosRequestConfig } from "axios";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import apiConfig from "../../../../utils/apiConfig";
import { ConsolidationInterface } from "../../../../types/ConsolidationInterface";

const api = setupAxiosInterceptors();

export const allTransactionsData = async (): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: apiConfig.allTransactions,
      method: "get",
    };
    const response = await api(config);
    return response?.data;
  } catch (error) {
    throw new Error("error while getting transactions data");
  }
};

export const getTransactionsByConsolidation = async (consolidation: string): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: `${apiConfig.transactionCons}/${consolidation}`,
      method: "get",
    };
    const response = await api(config);
    return response.data;
  } catch (error) {
    throw new Error("error getting transactions");
  }
};