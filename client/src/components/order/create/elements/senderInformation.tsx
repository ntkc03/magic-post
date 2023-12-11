import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../../../../features/redux/slices/user/tokenSlice";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Card,
    CardBody,
  } from "@material-tailwind/react";
import { orderInterface } from "../../../../types/OrderInterface";
import { useAddressSelector } from "../getAddressSelector";

export default function SenderInformation() {

  const { fetching } = useAddressSelector();  

  useEffect(() => {
    const city = document.getElementById("senderCity") as HTMLSelectElement;
    const district= document.getElementById("senderDistrict") as HTMLSelectElement;
    const ward = document.getElementById("senderVillage") as HTMLSelectElement;
    if (city && district && ward) {
        fetching({city, district, ward});
    }
  }, [fetching]);

  
  
  return (
    <div>
        {/* Sender Form */}
        <Card className="relative mx-[10%] lg:mx-[0%] lg:ml-[10%] lg:mr-[2.5%] shadow-lg shadow-gray-400">
            <CardBody className="p-4 ">
            
                <h1 className="font-bold">
                    Thông tin người gửi
                </h1>

                {/* information */}
                <div>
                    <div className="mb-4">
                        <label className="text-sm font-bold" htmlFor="name">
                            Tên người gửi
                        </label>
                        <input
                            id="senderName"
                            type="text"
                            placeholder="Nhập tên người gửi"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                        {/* {errors.confirmPassword && (
                            <p className="text-red-500 text-sm">
                            {errors.confirmPassword.message}
                            </p>
                        )} */}
                    </div>

                    <div className="mb-4">
                        <label className="text-sm font-bold" htmlFor="phone">
                            Điện thoại
                        </label>
                        <input
                            type="text"
                            id="senderPhone"
                            placeholder="Nhập số điện thoại của người gửi"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                        {/* {errors.confirmPassword && (
                            <p className="text-red-500 text-sm">
                            {errors.confirmPassword.message}
                            </p>
                        )} */}
                    </div>

                    <label className="text-sm font-bold" htmlFor="address">
                        Địa chỉ
                    </label>
                    <div className="grid lg:grid-cols-2 ">
                        <div className="lg:mr-2 my-2">
                            <select id="senderCountry" className="w-full px-2 py-3 border border-gray-300  rounded focus:outline-none focus:border-blue-500 form-select form-select-sm mb-3" aria-label=".form-select-sm">
                                <option value="" selected>Quốc gia</option>  
                                <option value="">Việt Nam</option>         
                            </select>
                        </div>
                        
                        <div className="lg:ml-2 my-2">
                            <select id='senderCity' className="w-full px-2 py-3 border border-gray-300  rounded focus:outline-none focus:border-blue-500 form-select form-select-sm mb-3" aria-label=".form-select-sm">
                                <option value="" selected>Tỉnh/Thành phố</option>     
                            </select>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2">
                        <div className="lg:mr-2 my-2">
                            <select id='senderDistrict'className="w-full px-2 py-3 border border-gray-300  rounded focus:outline-none focus:border-blue-500 form-select form-select-sm mb-3" aria-label=".form-select-sm">
                                <option value="" selected>Quận/Huyện</option>     
                            </select>
                        </div>

                        
                        <div className="lg:ml-2 my-2">
                            <select id='senderVillage' className="w-full px-2 py-3 border border-gray-300  rounded focus:outline-none focus:border-blue-500 form-select form-select-sm mb-3" aria-label=".form-select-sm">
                                <option value="" selected>Phường/Xã</option>     
                            </select>
                        </div>
                    </div>

                    <div className="mb-4 mt-2">
                        <input
                            id='senderHouseNumber'
                            type="text"
                            placeholder="Nhập số nhà/tên đường/thôn ..."
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                        {/* {errors.confirmPassword && (
                            <p className="text-red-500 text-sm">
                            {errors.confirmPassword.message}
                            </p>
                        )} */}
                    </div>

                </div>
            </CardBody>
        </Card>
    </div>
  );

}