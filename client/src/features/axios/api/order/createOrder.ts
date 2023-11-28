import axios from "axios";
import{ AxiosRequestConfig } from "axios";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import apiConfig from "../../../../utils/apiConfig";
import { orderInterface } from "../../../../types/OrderInterface";

const api = setupAxiosInterceptors();

export const orderData = async (): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: apiConfig.userData,
      method: "get",
    };
    const response = await api(config);
    return response.data;
  } catch (error) {
    throw new Error("error while getting user data");
  }
};

export const updateOrder = async (payload: orderInterface): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
    url: `${apiConfig.userRegister}`,
    method: "post",
    data: payload,
    };
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw new Error("error while updating user");
  }
};


export const deleteResume = async (): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: apiConfig.deleteResume,
      method: "delete",
    };
    await api(config);
  } catch (error) {
    throw new Error("error while deleting resume");
  }
};
