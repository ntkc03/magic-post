import { AxiosRequestConfig } from "axios";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import apiConfig from "../../../../utils/apiConfig";
import { employerInterface } from "../../../../types/EmployerInterface";

const api = setupAxiosInterceptors();

export const employerData = async (): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: apiConfig.getEmployer,
      method: "get",
    };
    const response = await api(config);
    return response.data;
  } catch (error) {
    throw new Error("error while getting user data");
  }
};

// export const updateUser = async (payload: UserInterface): Promise<any> => {
//   try {
//     const config: AxiosRequestConfig = {
//       url: apiConfig.updateUser,
//       method: "put",
//       data: payload,
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     };
//     const response = await api(config);
//     return response;
//   } catch (error) {
//     throw new Error("error while updating user");
//   }
// };

// export const uploadResume = async (file: File): Promise<any> => {
//   try {
//     const payload = new FormData();
//     payload.append("image", file);

//     const config: AxiosRequestConfig = {
//       url: apiConfig.uploadResume,
//       method: "put",
//       data: payload,
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     };

//     const response = await api(config);
//     return response;
//   } catch (error) {
//     throw new Error("Error while uploading resume");
//   }
// };

export const deleteEmployer = async (): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: apiConfig.deleteEmployer,
      method: "delete",
    };
    await api(config);
  } catch (error) {
    throw new Error("error while deleting employer");
  }
};
