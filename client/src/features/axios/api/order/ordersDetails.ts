import { AxiosRequestConfig } from "axios";
import apiConfig from "../../../../utils/apiConfig";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";

//************************************
// Description: Hàm liên quan lấy dữ liệu các đơn hàng.
//************************************

const api = setupAxiosInterceptors();

export const allOrders = async (): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: apiConfig.allOrders,
            method: "get",
        };
        const response = await api(config);
        return response?.data.allOrders;
    } catch (error) {
        throw new Error("error while getting consolidation data");
    }
};

