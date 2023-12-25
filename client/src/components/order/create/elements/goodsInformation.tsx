import { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

import "react-toastify/dist/ReactToastify.css";
import {
    Card,
    CardBody,
  } from "@material-tailwind/react";
import { orderInterface } from "../../../../types/OrderInterface";
import ItemDetails from "./itemDetails";


interface GoodsInformationProps {
    errors: FieldErrors<orderInterface>;
  }
  
const GoodsInformation: React.FC<GoodsInformationProps> = ({ errors }) => {


  const [items, setItems] = useState<React.ReactNode[]>([]);

  const checkboxOptions1 = [
    { value: 'highValue', label: 'Giá trị cao' },
    { value: 'fragile', label: 'Dễ vỡ' },
    { value: 'liquid', label: 'Chất lỏng' },
    { value: 'coldStorage', label: 'Hàng lạnh' },
  ];

  const checkboxOptions2 = [
    { value: 'solidBlock', label: 'Nguyên khối' },
    { value: 'oversized', label: 'Quá khổ' },
    { value: 'magneticBattery', label: 'Từ tính/Pin' },
    // Add more checkbox options as needed
  ];

  const handleAddItem = () => {
    setItems([...items, <ItemDetails key={items.length} />]);
  };

  
  const [type, setType] = useState<string | null>(null);
  const handleTypeChange = (value: string) => {
    setType(value === type ? null : value);
  };

  const [guide, setGuide] = useState<string | null>(null);
  const handleGuideChange = (value: string) => {
    setGuide(value === type ? null : value);
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
                                {[
                                    { label: 'Hàng hóa', value: 'goods' },
                                    { label: 'Tài liệu', value: 'document' },
                                ].map((option) => (
                                    <label key={option.value} className="inline-flex items-center">
                                    <input
                                        value={option.label}
                                        type="checkbox"
                                        checked={type === option.label}
                                        onChange={() => handleTypeChange(option.label)}
                                        className="type form-checkbox text-blue-600"
                                    />
                                    <span className="ml-2">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.type && (
                                <p className="text-red-500 text-sm">
                                {errors.type.message}
                                </p>
                            )}
                        </div>

                        <div className="border-t border-gray-300 my-4"></div>

                        <div className="mb-4">
                            <div id="items-list">
                                <ItemDetails/>
                                {items.map((item, index) => (
                                 <div key={index}>{item}</div>
                                ))}
                                {errors.items && (
                                    <p className="text-red-500 text-sm">
                                    {errors.items.message}
                                    </p>
                                )}
                            </div>

            

                            <div className="border-t border-gray-300 my-4"></div>

                            <div className="flex items-center justify-center">
                                <button type="button" id="add-items" onClick={handleAddItem} className="inline-flex items-center bg-white hover:bg-gray-100 border-2 text-blue-200 border-blue-200 py-2 px-2 shadow-md rounded">
                                    <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                    Thêm hàng hóa
                                </button>
                            </div>

                            <div className="border-t border-gray-300 my-4"></div>

                            <div>
                                <div className="my-4 lg:grid lg:grid-cols-3">
                                    <p className="lg:col-span-1 py-2">Tổng khối lượng (g)</p>
                                    <input
                                        type="text"
                                        placeholder="Nhập tổng khối lượng"
                                        id="total-weight"
                                        className="lg:col-span-2 lg:mx-4 lg:w-auto w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                    {errors.weight && (
                                    <p className="text-red-500 text-sm">
                                        {errors.weight.message}
                                        </p>
                                    )}
                                </div>

                                <div className="my-4 lg:grid lg:grid-cols-3">
                                    <p className="lg:col-span-1 py-2">Tổng giá trị (đ)</p>
                                    <input
                                        type="text"
                                        id="total-cost"
                                        placeholder="Nhập tổng giá trị"
                                        className="lg:col-span-2 lg:mx-4 lg:w-auto w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="border-t border-gray-300 my-4"></div>
                            
                            <div>
                                <label className="font-bold">
                                    Tính chất của hàng hóa đặc biệt
                                </label>

                                <div className="md:space-x-4 my-2 grid md:grid-cols-2">
                                    <div>
                                        {checkboxOptions1.map((option) => (
                                            <label key={option.value} className="flex items-center">
                                            <input
                                                value={option.label}
                                                type="checkbox"
                                                className="features form-checkbox text-blue-600"
                                            />
                                            <span className="ml-2">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>

                                    <div>
                                        {checkboxOptions2.map((option) => (
                                            <label key={option.value} className="flex items-center">
                                            <input
                                                value={option.label}
                                                type="checkbox"
                                                className="features form-checkbox text-blue-600"
                                            />
                                            <span className="ml-2">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>

                                    

                                </div>
                            </div>

                            <div className="border-t border-gray-300 my-4"></div>

                            <div>
                                <label className="font-bold">Chỉ dẫn của người gửi khi không phát được bưu gửi</label>
                                <div className="md:space-x-4 my-2 grid md:grid-cols-2">
                                    <div>
                                        {[
                                            { label: 'Chuyển hoàn ngay', value: 'returnImmediately' },
                                            { label: 'Gọi điện cho người gửi', value: 'callSender' },
                                            { label: 'Chuyển hoàn trước ngày', value: 'returnBeforeDate' },
                                        ].map((option) => (
                                            <label key={option.value} className="flex items-center">
                                            <input
                                                value={option.label}
                                                type="checkbox"
                                                checked={guide === option.label}
                                                onChange={() => handleGuideChange(option.label)}
                                                className="guides form-checkbox text-blue-600"
                                            />
                                            <span className="ml-2">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>

                                    <div>
                                        {[
                                            { label: 'Chuyển hoàn khi hết thời gian lưu trữ', value: 'returnWhenStorageExpires' },
                                            { label: 'Hủy', value: 'cancel' },
                                        ].map((option) => (
                                            <label key={option.value} className="flex items-center">
                                            <input
                                                value={option.label}
                                                type="checkbox"
                                                checked={guide === option.label}
                                                onChange={() => handleGuideChange(option.label)}
                                                className="guidles form-checkbox text-blue-600"
                                            />
                                            <span className="ml-2">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.cannotDelivered && (
                                        <p className="text-red-500 text-sm">
                                        {errors.cannotDelivered.message}
                                        </p>
                                    )}
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

                    <input
                        type="text"
                        id="COD"
                        placeholder="Nhập tiền thu hộ"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />

                    <div className="border-t border-gray-300 my-4"></div>
                    
                    <div className="mb-4">
                        <label className="text-sm font-bold" htmlFor="name">
                            Ghi chú
                        </label>
                        <textarea 
                        id="note"
                        className="resize-none border rounded w-full p-2 focus:outline-none focus:border-blue-500"
                        placeholder="Nhập ghi chú"
                        >
                        </textarea>
                    </div>
                </div>
            </CardBody>
        </Card>
    </div>
  );

}

export default GoodsInformation;