import axios, { AxiosRequestConfig } from "axios";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import apiConfig from "../../../../utils/apiConfig";
import { TransactionInterface } from "../../../../types/TransactionInterface";

const api = setupAxiosInterceptors();

export const allTransactionsData = async (): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: apiConfig.allTransactions,
      method: "get",
    };
    const response = await api(config);
    return response?.data.allTransactions;
  } catch (error) {
    throw new Error("error while getting transactions data");
  }
};

export const getTransactionsByConsolidation = async (transaction: string): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: `${apiConfig.transactionCons}/${transaction}`,
      method: "get",
    };
    const response = await api(config);
    return response.data;
  } catch (error) {
    throw new Error("error getting transactions");
  }
};

export const getTransactionByAddress = async (address: string, consolidation: string): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: `${apiConfig.transactionAddress}/${consolidation}/${address}`,
      method: "get",
    };
    const response = await api(config);
    return response.data;
  } catch (error) {
    throw new Error("error getting transactions");
  }
};


export const updateTransaction = async (payload: TransactionInterface): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
    url: `${apiConfig.updateTransaction}`,
    method: "put",
    data: payload,
    };
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw new Error("error while updating user");
  }
};