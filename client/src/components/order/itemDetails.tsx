import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../../features/redux/slices/user/tokenSlice";
import { useSelector, useDispatch } from "react-redux/es/exports";
// import { RootState } from "../../../features/redux/reducers/Reducer";
// import { loginSuccess } from "../../../features/redux/slices/user/userLoginAuthSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Card,
    CardBody,
  } from "@material-tailwind/react";
import { updateOrder } from "../../features/axios/api/order/createOrder";
import { orderInterface } from "../../types/OrderInterface";

export default function ItemDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
  } = useForm<orderInterface>({
    // resolver: yupResolver(userLoginValidationSchema),
  });

  return (
    <div>
        <label>
            Tên hàng
        </label>

        <div className="mb-4">
            <input
                type="text"
                placeholder="Nhập tên hàng hóa"
                {...register("item.name")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            {/* {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
                </p>
            )} */}
        </div>

        <div className="grid md:grid-cols-3">
            <div className="md:mr-2 mb-4">
                <input
                    type="text"
                    placeholder="Số lượng"
                    {...register("item.quantity")}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                {/* {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                    </p>
                )} */}
            </div>

            
            <div className="md:ml-2 md:mr-2 mb-4">
                <input
                    type="text"
                    placeholder="Trọng lượng"
                    {...register("item.weight")}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                {/* {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                    </p>
                )} */}
            </div>

            <div className="md:ml-2 mb-4">
                <input
                    type="text"
                    placeholder="Giá trị hàng"
                    {...register("item.cost")}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                {/* {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                    </p>
                )} */}
            </div>
        </div>
    </div>
  );

}