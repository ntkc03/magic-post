import axios from "axios";
import{ AxiosRequestConfig } from "axios";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import apiConfig from "../../../../utils/apiConfig";
import { orderInterface } from "../../../../types/OrderInterface";

//************************************
// Description: Hàm liên quan lấy dữ liệu, cập nhật và xóa đơn hàng.
//************************************

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
    throw new Error("Gặp lỗi khi lấy dữ liệu về đơn hàng. ");
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
    if (error.message === "Yêu cầu không thành công với mã trạng thái 409") {
      throw new Error("Tạo đơn hàng thất bại, thử lại.");
    } else {
      console.log(error.message);
      throw new Error("Tạo đơn hàng thất bại, thử lại");

    }
  }
};

export const getOrderList = async (): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: `${apiConfig.allOrders}`, // Adjust to your actual endpoint for fetching all data
      method: "get",
    };
    const response = await api(config);
    return response.data;
  } catch (error) {
    throw new Error("Gặp lỗi khi lấy dữ liệu về đơn hàng. ");
  }
};


export const updateOrder = async (payload: orderInterface): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
    url: `${apiConfig.updaterOrder}`,
    method: "put",
    data: payload,
    };
    console.log('hi')
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw new Error("Gặp lỗi khi cập nhật đơn hàng. ");
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
    throw new Error("Gặp lỗi khi xóa đơn hàng. ");
  }
};
