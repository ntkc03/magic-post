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

export default function CreateOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<orderInterface>({
    // resolver: yupResolver(userLoginValidationSchema),
  });
  
  function setPadding(){
    let padding: HTMLElement | null = document.getElementById('padding');
    let fixed: HTMLElement | null  = document.getElementById('fixed');

    if(padding) {
        padding.style.height = fixed?.offsetHeight + 'px';
    }
    

  }
  window.addEventListener('resize',setPadding);
  
    
  const token = localStorage.getItem("token");


  const notify = (msg: string, type: string) =>
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });


  

  const submitHandler = async (formData: orderInterface) => {
    updateOrder(formData)
      .then((response) => {
        const token = response.token;
        dispatch(setToken(token));
        // dispatch(loginSuccess());
        
        
        

        notify("Create Order Success", "success");
        setTimeout(() => {
          navigate("/user/home");
        }, 2000);
      })
      .catch((error: any) => {
        notify(error.message, "error");
      });
  };
  return (
    <div className="min-h-screen bg-background py-8">

        <div className="mx-[10%] lg:mx-[2.5%] mb-[1%] flex">
            <h1 className="text-[30px] mr-[1%]">Tạo đơn</h1>
            <img
                src="https://imgur.com/5KtEikT.png"
                alt="Img"
                className="w-10 h-full"
            />
        </div>
        <form onSubmit={handleSubmit(submitHandler)} className="lg:grid lg:grid-cols-2">
            <div className="flex-1">
                {/* Sender Form */}
                <Card className="relative mx-[10%] lg:mx-[5%] shadow-lg shadow-gray-400">
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
                                    type="text"
                                    placeholder="Nhập tên người gửi"
                                    {...register("senderName")}
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
                                    placeholder="Nhập số điện thoại của người gửi"
                                    {...register("senderAddress")}
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
                                    <input
                                        type="text"
                                        placeholder="Quốc gia"
                                        {...register("senderCountry")}
                                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                    {/* {errors.confirmPassword && (
                                        <p className="text-red-500 text-sm">
                                        {errors.confirmPassword.message}
                                        </p>
                                    )} */}
                                </div>
                                
                                <div className="lg:ml-2 my-2">
                                    <input
                                        type="text"
                                        placeholder="Tỉnh/Thành phố"
                                        {...register("senderCity")}
                                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                    {/* {errors.confirmPassword && (
                                        <p className="text-red-500 text-sm">
                                        {errors.confirmPassword.message}
                                        </p>
                                    )} */}
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-2">
                                <div className="lg:mr-2 my-2">
                                    <input
                                        type="text"
                                        placeholder="Quận/Huyện/Thị trấn"
                                        {...register("senderDistrict")}
                                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                    {/* {errors.confirmPassword && (
                                        <p className="text-red-500 text-sm">
                                        {errors.confirmPassword.message}
                                        </p>
                                    )} */}
                                </div>

                                
                                <div className="lg:ml-2 my-2">
                                    <input
                                        type="text"
                                        placeholder="Phường/Xã"
                                        {...register("senderCommunes")}
                                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                    {/* {errors.confirmPassword && (
                                        <p className="text-red-500 text-sm">
                                        {errors.confirmPassword.message}
                                        </p>
                                    )} */}
                                </div>
                            </div>

                            <div className="mb-4 mt-2">
                                <input
                                    type="text"
                                    placeholder="Nhập số nhà/tên đường/thôn ..."
                                    {...register("senderHouseNumber")}
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

                {/* Receiver Form */}
                <Card className="relative mx-[10%] mt-8 lg:mx-[5%] shadow-lg shadow-gray-400">
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
                                    type="text"
                                    placeholder="Nhập tên người nhận"
                                    {...register("receiverName")}
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
                                    placeholder="Nhập số điện thoại của người nhận"
                                    {...register("receiverPhone")}
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
                                    <input
                                        type="text"
                                        placeholder="Quốc gia"
                                        {...register("receiverCountry")}
                                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                    {/* {errors.confirmPassword && (
                                        <p className="text-red-500 text-sm">
                                        {errors.confirmPassword.message}
                                        </p>
                                    )} */}
                                </div>
                                
                                <div className="lg:ml-2 my-2">
                                    <input
                                        type="text"
                                        placeholder="Tỉnh/Thành phố"
                                        {...register("receiverCity")}
                                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                    {/* {errors.confirmPassword && (
                                        <p className="text-red-500 text-sm">
                                        {errors.confirmPassword.message}
                                        </p>
                                    )} */}
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-2">
                                <div className="lg:mr-2 my-2">
                                    <input
                                        type="text"
                                        placeholder="Quận/Huyện/Thị trấn"
                                        {...register("receiverDistrict")}
                                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                    {/* {errors.confirmPassword && (
                                        <p className="text-red-500 text-sm">
                                        {errors.confirmPassword.message}
                                        </p>
                                    )} */}
                                </div>

                                
                                <div className="lg:ml-2 my-2">
                                    <input
                                        type="text"
                                        placeholder="Phường/Xã"
                                        {...register("receiverVillage")}
                                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                    {/* {errors.confirmPassword && (
                                        <p className="text-red-500 text-sm">
                                        {errors.confirmPassword.message}
                                        </p>
                                    )} */}
                                </div>
                            </div>

                            <div className="mb-4 mt-2">
                                <input
                                    type="text"
                                    placeholder="Nhập số nhà/tên đường/thôn ..."
                                    {...register("receiverHouseNumber")}
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
            
            {/* Goods */}
            <div className="flex-1 mb-8">
                <Card className="relative mx-[10%] mt-8 lg:mt-0 lg:mx-[5%] shadow-lg shadow-gray-400">
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
                                    <div>
                                        <label>
                                            Tên hàng 1
                                        </label>

                                        <div className="mb-4">
                                            <input
                                                type="text"
                                                placeholder="Nhập tên hàng hóa"
                                                // {...register("confirmPassword")}
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
                                                    // {...register("confirmPassword")}
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
                                                    // {...register("confirmPassword")}
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
                                                    // {...register("confirmPassword")}
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

                                    <div className="border-t border-gray-300 my-4"></div>

                                    <div className="flex items-center justify-center">
                                        <button className="inline-flex items-center bg-white hover:bg-gray-100 border-2 text-blue-200 border-blue-200 py-2 px-2 shadow-md rounded">
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
                                                        // {...register("page2q2")}
                                                    />
                                                    <span className="ml-2">Giá trị cao</span>
                                                </label>

                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="form-radio text-blue-600"
                                                        // {...register("page2q2")}
                                                    />
                                                    <span className="ml-2">Dễ vỡ</span>
                                                </label>

                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="form-radio text-blue-600"
                                                        // {...register("page2q2")}
                                                    />
                                                    <span className="ml-2">Chất lỏng</span>
                                                </label>

                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="form-radio text-blue-600"
                                                        // {...register("page2q2")}
                                                    />
                                                    <span className="ml-2">Hàng lạnh</span>
                                                </label>
                                            </div>

                                            <div>
                                            <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="form-radio text-blue-600"
                                                        // {...register("page2q2")}
                                                    />
                                                    <span className="ml-2">Nguyên khối</span>
                                                </label>

                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="form-radio text-blue-600"
                                                        // {...register("page2q2")}
                                                    />
                                                    <span className="ml-2">Quá khổ</span>
                                                </label>

                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="form-radio text-blue-600"
                                                        // {...register("page2q2")}
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

                <Card className="relative mx-[10%] mt-8 lg:mx-[5%] shadow-lg shadow-gray-400">
                    <CardBody className="p-4 ">
                        <h1 className="font-bold">
                            Tiền thu hộ
                        </h1>
                        <div className="my-4 ml-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-radio text-blue-600"
                                    // {...register("page2q2")}
                                />
                                <span className="ml-2">Thu hộ bằng tiền hàng</span>
                            </label>

                            <input
                                type="text"
                                placeholder="Nhập tiền thu hộ"
                                // {...register("confirmPassword")}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            />

                            <div className="border-t border-gray-300 my-4"></div>
                            
                            <div className="mb-4">
                                <label className="text-sm font-bold" htmlFor="name">
                                    Ghi chú
                                </label>
                                <textarea className="resize-none border rounded w-full p-2 focus:outline-none focus:border-blue-500"
                                placeholder="Nhập ghi chú">

                                </textarea>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

            <div id='padding' className="hidden md:block">
                {/* Some space (adjust the margin-bottom value as needed) */}
            </div>

            {/* Money */}

            <div id='fixed' className="md:mx-[0%] md:w-[90%] md:fixed md:bottom-0 md:left-1/2 md:transform md:-translate-x-1/2 md:z-10 lg:grid lg:grid-cols-6 mx-[5%] bg-white rounded border-[3px] border-gray-400 my-[5px]">
                 <div className="grid col-span-2 grid-cols-2 border-b-[3px] lg:border-b-[0px] border-gray-300">
                    <div className="col-span-1 lg:p-4 p-2 border-r-[3px] border-gray-300">
                        <p className="lg:mb-2">Tổng cước</p>
                        <p>0 đ</p>
                    </div>

                    <div className="col-span-1 lg:p-4 p-2 lg:border-r-[3px] border-gray-300">
                        <p className="lg:mb-2">Tiền thu hộ</p>
                        <p>0 đ</p>
                    </div>
                 </div>

                 <div className="grid col-span-2 grid-cols-2 border-b-[3px] lg:border-b-[0px] border-gray-300">
                    <div className="lg:col-span-1 md:p-4 p-2 border-r-[3px] border-gray-300">
                        <p className="lg:mb-2">Tiền thu người nhận</p>
                        <p>0 đ</p>
                    </div>

                    <div className="lg:col-span-1 md:p-4 p-2 lg:border-r-[3px] border-gray-300">
                        <p className="lg:mb-2">Thời gian dự kiến</p>
                        <p></p>
                    </div>
                 </div>

                 <div className="col-span-2 py-4 grid lg:grid-cols-3 grid-cols-1 flex items-center">
                    <div className="flex justify-center pb-2">
                        <button 
                            type="submit"
                            className="w-[90%] bg-white hover:bg-blue-100 border-2 text-blue-200 border-blue-200 py-2 px-2 shadow-md rounded"
                            >
                            Gửi ngay
                        </button>
                    </div>

                    <div className="col-span-2 pb-2 grid grid-cols-2 mx-[5%] lg:mx-[0%]">
                        <div className="flex justify-center">
                            <button className="w-full lg:w-[90%] bg-gray-700 hover:bg-gray-400 border-2 text-white py-2 px-2 rounded">
                                Lưu nháp
                            </button>
                        </div>

                        <div className="flex justify-center">
                            <button className="w-full lg:w-[90%] bg-gray-700 hover:bg-gray-400 border-2 text-white py-2 px-2 rounded">
                                Làm mới
                            </button>
                        </div>
                    </div>


                    
                 </div>

            </div>
            
        </form>
    </div>
  );
}
