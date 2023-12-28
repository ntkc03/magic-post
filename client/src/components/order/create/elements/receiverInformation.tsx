import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
    Card,
    CardBody,
  } from "@material-tailwind/react";
import { useAddressSelector } from "../getAddressSelector";
import { FieldErrors } from "react-hook-form";
import { orderInterface } from "../../../../types/OrderInterface";

//************************************
// Description: Phần Thông tin người nhận của phần tạo đơn mới.
//************************************

interface ReceiverInformationProps {
    errors: FieldErrors<orderInterface>;
  }
  
const ReceiverInformation: React.FC<ReceiverInformationProps> = ({ errors }) => {

// Tạo option cho bộ selector. 
const { fetching } = useAddressSelector();
useEffect(() => {
    const city = document.getElementById("receiverCity") as HTMLSelectElement;
    const district= document.getElementById("receiverDistrict") as HTMLSelectElement;
    const ward = document.getElementById("receiverVillage") as HTMLSelectElement;
    if (city && district && ward) {
        fetching({city, district, ward});
    }
}, [fetching]);


  return (
    <div>
        {/* Receiver Form */}
        <Card className="relative mx-[10%] mt-8 lg:mx-[0%] lg:ml-[10%] lg:mr-[2.5%] shadow-lg shadow-gray-400">
            <CardBody className="p-4 ">
                <h1 className="font-bold">
                    Thông tin người nhận
                </h1>

                {/* information */}
                <div>
                    <div className="mb-4">
                        <label className="text-sm font-bold" htmlFor="name">
                            Tên người nhận
                        </label>
                        <input
                            id="receiverName"
                            type="text"
                            placeholder="Nhập tên người nhận"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                        {errors.receiverName && (
                            <p className="text-red-500 text-sm">
                            {errors.receiverName.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="text-sm font-bold" htmlFor="phone">
                            Điện thoại
                        </label>
                        <input
                            id="receiverPhone"
                            type="text"
                            placeholder="Nhập số điện thoại của người nhận"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                        {errors.receiverPhone && (
                            <p className="text-red-500 text-sm">
                            {errors.receiverPhone.message}
                            </p>
                        )}
                    </div>

                    <label className="text-sm font-bold" htmlFor="address">
                        Địa chỉ
                    </label>
                    <div className="grid lg:grid-cols-2 ">
                        <div className="lg:mr-2 my-2">
                            <select id="receiverCountry" className="w-full px-2 py-3 border border-gray-300  rounded focus:outline-none focus:border-blue-500 form-select form-select-sm mb-3" aria-label=".form-select-sm">
                                <option value="" hidden>Quốc gia</option>  
                                <option value="Việt Nam">Việt Nam</option>         
                            </select>
                            {errors.receiverCountry && (
                                <p className="text-red-500 text-sm">
                                {errors.receiverCountry.message}
                                </p>
                            )}
                        </div>
                        
                        <div className="lg:ml-2 my-2">
                            <select id="receiverCity" className="w-full px-2 py-3 border border-gray-300  rounded focus:outline-none focus:border-blue-500 form-select form-select-sm mb-3" aria-label=".form-select-sm">
                                <option value="" hidden>Tỉnh/Thành phố</option>     
                            </select>
                            {errors.receiverCity && (
                            <p className="text-red-500 text-sm">
                            {errors.receiverCity.message}
                            </p>
                        )}
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2">
                        <div className="lg:mr-2 my-2">
                            <select id="receiverDistrict" className="w-full px-2 py-3 border border-gray-300  rounded focus:outline-none focus:border-blue-500 form-select form-select-sm mb-3"  aria-label=".form-select-sm">
                                <option value="" hidden>Quận/Huyện</option>     
                            </select>
                            {errors.receiverDistrict && (
                            <p className="text-red-500 text-sm">
                            {errors.receiverDistrict.message}
                            </p>
                        )}
                        </div>

                        
                        <div className="lg:ml-2 my-2">
                            <select id="receiverVillage" className="w-full px-2 py-3 border border-gray-300  rounded focus:outline-none focus:border-blue-500 form-select form-select-sm mb-3" aria-label=".form-select-sm">
                                <option value="" hidden >Phường/Xã</option>     
                            </select>
                            {errors.receiverVillage && (
                            <p className="text-red-500 text-sm">
                            {errors.receiverVillage.message}
                            </p>
                        )}
                        </div>
                    </div>

                    <div className="mb-4 mt-2">
                        <input
                            id="receiverHouseNumber" 
                            type="text"
                            placeholder="Nhập số nhà/tên đường/thôn ..."
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                        {errors.receiverHouseNumber && (
                            <p className="text-red-500 text-sm">
                            {errors.receiverHouseNumber.message}
                            </p>
                        )}
                    </div>

                </div>
            </CardBody>
        </Card>
    </div>
  );

}

export default ReceiverInformation;