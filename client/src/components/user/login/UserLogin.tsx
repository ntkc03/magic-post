import { useEffect, useState } from "react";
import { UserInterface } from "../../../types/UserInterface";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoginPayload } from "../../../types/PayloadInterface";
import { userLoginValidationSchema } from "../../../utils/validation";
import { userLogin } from "../../../features/axios/api/user/userAuthentication";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../../../features/redux/slices/user/tokenSlice";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { RootState } from "../../../features/redux/reducers/Reducer";
import { loginSuccess } from "../../../features/redux/slices/user/userLoginAuthSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  updateUser,
  userData,
} from "../../../features/axios/api/user/userDetails";

export default function UserLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const isLoggedIn = useSelector(
  //   (state: RootState) => state.userAuth.isLoggedIn
  // );
  
  const token = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: yupResolver(userLoginValidationSchema),
  });

  const notify = (msg: string, type: string) =>
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });

  useEffect(() => {
    if (token) {
      dispatch(loginSuccess());
    }
    // if (isLoggedIn === true) {
    //   navigate("/user/home");
    // }
  }, [navigate]);

  

  const submitHandler = async (formData: LoginPayload) => {
    userLogin(formData)
      .then((response) => {
        const token = response.token;
        dispatch(setToken(token));
        dispatch(loginSuccess());
        
        
        

        notify("Login success", "success");
        setTimeout(() => {
          navigate("/user/home");
        }, 2000);
      })
      .catch((error: any) => {
        notify(error.message, "error");
      });
  };
  return (
    <div className="flex justify-center min-h-screen bg-background">
      <div className="flex justify-center items-center">
        <div className="lg:block hidden"> 
          <img
            src="https://i.imgur.com/5KtEikT.png"
            alt="Img"
            className="max-w-450 max-h-450 w-4/5"
          />
          <img
            src="https://i.imgur.com/7XTdnaF.png"
            alt="Img"
            className="mt-[-180px] max-w-450 max-h-450 w-1/5"
          />
        </div>
        
      </div>
      <div className="flex flex-wrap justify-center items-center ">
        <div className="w-96 h-auto p-8 bg-white border border-gray-300 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
            <div>
              <label className="text-sm" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="text  "
                placeholder="Email"
                {...register("email")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500  "
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500 "
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-3 py-2 text-sm  bg-activeButton text-white rounded hover:bg-buttonPurple flex justify-center items-center "
            >
              Login
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link to={"/user/register"}>
              <span className="text-gray-500">
                Don't have an account?{" "}
                <p className="text-loginText underline">Register</p>
              </span>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
