import axios, { AxiosRequestConfig } from "axios";
import {
  LoginPayload,
  SignupPayload,
} from "../../../../types/PayloadInterface";
import apiConfig from "../../../../utils/apiConfig";

export const createAccount = async (payload: SignupPayload): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: `${apiConfig.createAccount}`,
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

export const login = async (payload: LoginPayload): Promise<any> => {
  try {
    
    const config: AxiosRequestConfig = {
      url: `${apiConfig.login}`,
      method: "post",
      data: payload,
    };
    // console.log("123", config)
   
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    if (error.message === "Request failed with status code 401") {
      throw new Error("Incorrect username or password !!!");
    } else {
      throw new Error("Login failed, try again");
    }
  }
};

