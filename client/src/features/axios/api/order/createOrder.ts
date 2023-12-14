import axios from "axios";
import{ AxiosRequestConfig } from "axios";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import apiConfig from "../../../../utils/apiConfig";
import { orderInterface } from "../../../../types/OrderInterface";

const api = setupAxiosInterceptors();

export const orderData = async (orderCode: string): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: `${apiConfig.orderCode}/${orderCode}`,
      method: "get",
    };
    const response = await api(config);
    return response.data;
  } catch (error) {
    throw new Error("error while getting user data");
  }
};

export const createOrder = async (payload: orderInterface): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: `${apiConfig.createOrder}`,
      method: "post",
      data: payload,
    };
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    if (error.message === "Request failed with status code 409") {
      throw new Error("Username already exists !!!");
    } else {
      console.log(error.message);
      throw new Error("Create account failed, try again");

    }
  }
};


export const updateOrder = async (payload: orderInterface): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
    url: `${apiConfig.updaterOrder}`,
    method: "put",
    data: payload,
    };
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw new Error("error while updating user");
  }
};


export const deleteOrder = async (): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: apiConfig.deleteOrder,
      method: "delete",
    };
    await api(config);
  } catch (error) {
    throw new Error("error while deleting resume");
  }
};
