import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../../features/redux/slices/user/tokenSlice";
import { useSelector, useDispatch } from "react-redux/es/exports";

import "react-toastify/dist/ReactToastify.css";
import {
    Card,
    CardBody,
  } from "@material-tailwind/react";
import { orderInterface } from "../../types/OrderInterface";
import ItemDetails from "./itemDetails";


export default function GoodsInformation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
  } = useForm<orderInterface>({
    // resolver: yupResolver(userLoginValidationSchema),
  });

  const [items, setItems] = useState<React.ReactNode[]>([]);

  const handleAddItem = () => {
    // Add a new item to the array
    setItems([...items, <ItemDetails key={items.length} />]);
  };

  return (
    <div>
        <Card className="relative mx-[10%] mt-8 lg:mt-0 lg:mx-[0%] lg:mr-[10%] lg:ml-[2.5%] shadow-lg shadow-gray-400">
            <CardBody className="p-4 ">
                <h1 className="font-bold">
                    Thông tin hàng hóa
                </h1>
                <div>
                    {/* information */}
                    <div>
                        <div className="mb-4 mt-4">
                            <label className="font-bold">
                                Loại hàng gửi
                            </label>
                            <div className="md:space-x-4 my-2 grid md:grid-cols-2">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-radio text-blue-600"
                                        {...register("type")}
                                    />
                                    <span className="ml-2">Tài liệu</span>
                                </label>

                                <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-radio text-blue-600"
                                    {...register("type")}
                                />
                                <span className="ml-2">Hàng hóa</span>
                                </label>
                            </div>
                        </div>

                        <div className="border-t border-gray-300 my-4"></div>

                        <div className="mb-4">
                            <div id="items-list">
                                <ItemDetails/>
                                {items.map((item, index) => (
                                <div key={index}>{item}</div>
                                ))}
                            </div>

                            <div className="border-t border-gray-300 my-4"></div>

                            <div className="flex items-center justify-center">
                                <button id="add-items" onClick={handleAddItem} className="inline-flex items-center bg-white hover:bg-gray-100 border-2 text-blue-200 border-blue-200 py-2 px-2 shadow-md rounded">
                                    <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                    Thêm hàng hóa
                                </button>
                            </div>

                            <div className="border-t border-gray-300 my-4"></div>

                            <div>
                                <div className="space-x-4 my-4 grid grid-cols-2">
                                    <p>Tổng khối lượng</p>

                                    <p className="text-right text-blue-700">
                                        0 g
                                    </p>
                                </div>

                                <div className="space-x-4 my-4 grid grid-cols-2">
                                    <p>Tổng giá trị</p>

                                    <p className="text-right text-blue-700">
                                        0 đ
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-gray-300 my-4"></div>
                            
                            <div>
                                <label className="font-bold">
                                    Tính chất của hàng hóa đặc biệt
                                </label>

                                <div className="md:space-x-4 my-2 grid md:grid-cols-2">
                                    <div>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="form-radio text-blue-600"
                                            />
                                            <span className="ml-2">Giá trị cao</span>
                                        </label>

                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="form-radio text-blue-600"
                                            />
                                            <span className="ml-2">Dễ vỡ</span>
                                        </label>

                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="form-radio text-blue-600"
                                            />
                                            <span className="ml-2">Chất lỏng</span>
                                        </label>

                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="form-radio text-blue-600"
                                            />
                                            <span className="ml-2">Hàng lạnh</span>
                                        </label>
                                    </div>

                                    <div>
                                    <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="form-radio text-blue-600"
                                            />
                                            <span className="ml-2">Nguyên khối</span>
                                        </label>

                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="form-radio text-blue-600"
                                            />
                                            <span className="ml-2">Quá khổ</span>
                                        </label>

                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="form-radio text-blue-600"
                                            />
                                            <span className="ml-2">Từ tính/Pin</span>
                                        </label>
                                    </div>

                                </div>
                            </div>

                            <div className="border-t border-gray-300 my-4"></div>

                            <div>
                                <label className="font-bold">Chỉ dẫn của người gửi khi không phát được bưu gửi</label>
                                <div className="md:space-x-4 my-2 grid md:grid-cols-2">
                                    <div>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="form-radio text-blue-600"
                                                // {...register("page2q2")}
                                            />
                                            <span className="ml-2">Chuyển hoàn ngay</span>
                                        </label>

                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="form-radio text-blue-600"
                                                // {...register("page2q2")}
                                            />
                                            <span className="ml-2">Gọi điện cho người gửi</span>
                                        </label>

                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="form-radio text-blue-600"
                                                // {...register("page2q2")}
                                            />
                                            <span className="ml-2">Chuyển hoàn trước ngày</span>
                                        </label>
                                    </div>

                                    <div>
                                    <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="form-radio text-blue-600"
                                                // {...register("page2q2")}
                                            />
                                            <span className="ml-2">Chuyển hoàn khi hết thời gian lưu trữ</span>
                                        </label>

                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="form-radio text-blue-600"
                                                // {...register("page2q2")}
                                            />
                                            <span className="ml-2">Hủy</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>

        <Card className="relative mx-[10%] mt-8 lg:mx-[0%] lg:mr-[10%] lg:ml-[2.5%] shadow-lg shadow-gray-400">
            <CardBody className="p-4 ">
                <h1 className="font-bold">
                    Tiền thu hộ
                </h1>
                <div className="my-4 ml-2">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            className="form-radio text-blue-600"
                        />
                        <span className="ml-2">Thu hộ bằng tiền hàng</span>
                    </label>

                    <input
                        type="text"
                        placeholder="Nhập tiền thu hộ"
                        {...register("COD")}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />

                    <div className="border-t border-gray-300 my-4"></div>
                    
                    <div className="mb-4">
                        <label className="text-sm font-bold" htmlFor="name">
                            Ghi chú
                        </label>
                        <textarea className="resize-none border rounded w-full p-2 focus:outline-none focus:border-blue-500"
                        placeholder="Nhập ghi chú"
                        {...register("note")}>
                        </textarea>
                    </div>
                </div>
            </CardBody>
        </Card>
    </div>
  );

}