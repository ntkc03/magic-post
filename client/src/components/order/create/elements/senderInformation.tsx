import React, { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux/es/exports";
import "react-toastify/dist/ReactToastify.css";
import {
    Card,
    CardBody,
  } from "@material-tailwind/react";
import { orderInterface } from "../../../../types/OrderInterface";
import { useAddressSelector } from "../getAddressSelector";
import { employerData } from "../../../../features/axios/api/employer/userDetails";
import { fetchUser, clearUserDetails } from "../../../../features/redux/slices/user/userDetailsSlice";
import { employerInterface } from "../../../../types/EmployerInterface";
import { ConsolidationInterface } from "../../../../types/ConsolidationInterface";
import { getConsolidationByAddress } from "../../../../features/axios/api/consolidation/consolidationPointDetails";

//************************************
// Description: Phần Thông tin người gửi của phần tạo đơn mới.
//************************************

interface SenderInformationProps {
    errors: FieldErrors<orderInterface>;
  }
  
const token = localStorage.getItem("token");
const SenderInformation: React.FC<SenderInformationProps> = ({ errors }) => {
  const dispatch = useDispatch();
  const [employerDetails, setEmployerDetails] = useState<employerInterface>();
  const [employerConsolidation, setEmployerConsolidation] = useState<ConsolidationInterface>();

//   Lấy thông tin của nhân viên để đặt địa chỉ gửi mặc định.
  useEffect(() => {
    if (token) {
      dispatch(fetchUser());
      const employerDetails = async () => {
        const data = await employerData();
        setEmployerDetails(data);
        const employer: employerInterface = data;

        if (employer.consolidation) {
        getConsolidationByAddress(employer.consolidation)
            .then((consolidation: ConsolidationInterface) => {
            setEmployerConsolidation(consolidation);
            })
            .catch((error) => {
            console.error("Error fetching consolidation:", error);
            });
        }
      };
      employerDetails();
    }
    return () => {
      dispatch(clearUserDetails());
    };
  }, [dispatch]);


//   Tạo option cho bộ selector địa chỉ.
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
                        {errors.senderName && (
                            <p className="text-red-500 text-sm">
                            {errors.senderName.message}
                            </p>
                        )}
                        
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
                        {errors.senderPhone && (
                            <p className="text-red-500 text-sm">
                            {errors.senderPhone.message}
                            </p>
                        )}
                    </div>

                    <label className="text-sm font-bold" htmlFor="address">
                        Địa chỉ
                    </label>
                    <div className="grid lg:grid-cols-2 ">
                        <div className="lg:mr-2 my-2">
                            <select id="senderCountry" className="w-full px-2 py-3 border border-gray-300  rounded focus:outline-none focus:border-blue-500 form-select form-select-sm mb-3" aria-label=".form-select-sm">
                                <option value="" hidden>Quốc gia</option>  
                                <option value="Việt Nam" selected>Việt Nam</option>         
                            </select>
                            {errors.senderCountry && (
                                <p className="text-red-500 text-sm">
                                {errors.senderCountry.message}
                                </p>
                            )}
                        </div>
                        
                        <div className="lg:ml-2 my-2">
                            <select id='senderCity' className="w-full px-2 py-3 border border-gray-300  rounded focus:outline-none focus:border-blue-500 form-select form-select-sm mb-3" aria-label=".form-select-sm">
                                <option value={employerConsolidation?.city} selected hidden>{employerConsolidation?.city}</option>     
                            </select>
                            {errors.senderCity && (
                                <p className="text-red-500 text-sm">
                                {errors.senderCity.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2">
                        <div className="lg:mr-2 my-2">
                            <select id='senderDistrict'className="w-full px-2 py-3 border border-gray-300  rounded focus:outline-none focus:border-blue-500 form-select form-select-sm mb-3" aria-label=".form-select-sm">
                                <option value={employerConsolidation?.address} selected hidden>{employerConsolidation?.address}</option>     
                            </select>
                            {errors.senderDistrict && (
                                <p className="text-red-500 text-sm">
                                {errors.senderDistrict.message}
                                </p>
                            )}
                        </div>

                        
                        <div className="lg:ml-2 my-2">
                            <select id='senderVillage' className="w-full px-2 py-3 border border-gray-300  rounded focus:outline-none focus:border-blue-500 form-select form-select-sm mb-3" aria-label=".form-select-sm">
                                <option value={employerDetails?.transaction} selected hidden>{employerDetails?.transaction}</option>     
                            </select>
                            {errors.senderVillage && (
                                <p className="text-red-500 text-sm">
                                {errors.senderVillage.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mb-4 mt-2">
                        <input
                            id='senderHouseNumber'
                            type="text"
                            placeholder="Nhập số nhà/tên đường/thôn ..."
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                        {errors.senderHouseNumber && (
                            <p className="text-red-500 text-sm">
                            {errors.senderHouseNumber.message}
                            </p>
                        )}
                    </div>

                </div>
            </CardBody>
        </Card>
    </div>
  );

}

export default SenderInformation;