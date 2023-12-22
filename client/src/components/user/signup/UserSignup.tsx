import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { userRegisterValidationSchema } from "../../../utils/validation";
import { SignupPayload } from "../../../types/PayloadInterface";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../../../features/axios/api/employer/userAuthentication";
import { employerInterface } from "../../../types/EmployerInterface";
import { employerData } from "../../../features/axios/api/employer/userDetails";

export default function UserSignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupPayload>({
    resolver: yupResolver(userRegisterValidationSchema),
  });


  const token = localStorage.getItem("token");
  const [employerDetails, setEmployerDetails] = useState<employerInterface>();


  const getEmployerDetails = async () => {
    const data = await employerData();
    setEmployerDetails(data);
  }

  useEffect(() => {
    getEmployerDetails();
  }, []);

  const notify = (msg: string, type: string) =>
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.BOTTOM_RIGHT })
      : toast.success(msg, { position: toast.POSITION.BOTTOM_RIGHT });

  const submitHandler = async (formData: SignupPayload) => {
    createAccount(formData)
      .then((response: any) => {
        notify("User registered successfully", "success");

        setTimeout(() => {
          if (token) {
            if (employerDetails?.role === "director") {
              navigate("/director/statistics-points");
            } else {
              navigate("/employer/login");
            }
          }
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
        <div className="w-screen h-screen md:w-96 md:h-auto p-8 bg-white border border-gray-300 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Tạo tài khoản</h2>
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
            <div>
              <label className="text-sm" htmlFor="email">
                Tên
              </label>
              <input
                type="text"
                placeholder="Nhập tên người dùng"
                {...register("name")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm" htmlFor="email">
                Tên đăng nhập
              </label>
              <input
                id="username"
                type="text"
                placeholder="Nhập tên đăng nhập"
                {...register("username")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm" htmlFor="email">
                Điện thoại
              </label>
              <input
                type="phone"
                placeholder="Nhập số điện thoại"
                {...register("phone")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm" htmlFor="email">
                Mật khẩu
              </label>
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                {...register("password")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm" htmlFor="email">
                Xác nhận lại mật khẩu
              </label>
              <input
                type="password"
                placeholder="Nhập lại mật khẩu để xác nhận"
                {...register("confirmPassword")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-3 py-2 text-sm bg-activeButton text-white rounded hover:bg-buttonPurple flex justify-center items-center"
            >
              Đăng ký
            </button>
          </form>
          {/* <span className="mr-2 flex justify-center">or</span> */}
          <div className="flex items-center justify-center mt-2">
            <div className="flex items-center mt-2">

            </div>
          </div>

          <div className="mt-4 text-center">
            <Link to={"/user/login"}>
              <span className="text-gray-500">
                Đã có tài khoản?
                <p className="text-loginText underline">Đăng nhập</p>
              </span>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
