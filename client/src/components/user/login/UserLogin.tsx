import { useEffect, useState } from "react";
import { UserInterface } from "../../../types/UserInterface";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoginPayload } from "../../../types/PayloadInterface";
import { userLoginValidationSchema } from "../../../utils/validation";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../../../features/redux/slices/user/tokenSlice";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { RootState } from "../../../features/redux/reducers/Reducer";
import { loginSuccess } from "../../../features/redux/slices/user/userLoginAuthSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../../features/axios/api/employer/userAuthentication";
import { log } from "console";


export default function UserLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(
    (state: RootState) => state.userAuth.isLoggedIn
  );

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
    if (isLoggedIn === true) {
      navigate("/employer/home");
    }
  }, [navigate]);



  const submitHandler = async (formData: LoginPayload) => {
    login(formData)
      .then((response) => {
        const token = response.token;
        console.log("test",token);
        dispatch(setToken(token));
        dispatch(loginSuccess());
        notify("Login success", "success");
        setTimeout(() => {
          navigate("/employer/home");
          console.log(dispatch)
        }, 200);
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
        <div className="w-screen h-screen md:w-96 md:h-auto p-8 bg-white border border-gray-300 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold mb-4">Đăng nhập</h2>
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
            <div>
              <label className="text-sm" htmlFor="email">
                Tên đăng nhập
              </label>
              <input
                id="username"
                type="text  "
                placeholder="Nhập tên đăng nhập"
                {...register("username")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500  "
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm" htmlFor="password">
                Mật khẩu
              </label>
              <input
                type="password"
                placeholder="Nhập mật khẩu"
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
              Đăng nhập
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link to={"/employer/register"}>
              <span className="text-gray-500">
                Chưa có tài khoản?{" "}
                <p className="text-loginText underline">Đăng ký</p>
              </span>
            </Link>
          </div>

          <div className="flex justify-center lg:hidden">
            <img src="https://i.imgur.com/TSDO2cW.gif"
              alt="img"
              className="h-auto w-auto" />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
