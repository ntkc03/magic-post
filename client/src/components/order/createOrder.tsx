import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
// import { setToken } from "../../../features/redux/slices/user/tokenSlice";
import { useSelector, useDispatch } from "react-redux/es/exports";
// import { RootState } from "../../../features/redux/reducers/Reducer";
// import { loginSuccess } from "../../../features/redux/slices/user/userLoginAuthSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Card,
    CardBody,
  } from "@material-tailwind/react";

export default function CreateOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const isLoggedIn = useSelector(
  //   (state: RootState) => state.userAuth.isLoggedIn
  // );
  
  const token = localStorage.getItem("token");

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginPayload>({
//     resolver: yupResolver(userLoginValidationSchema),
//   });

  const notify = (msg: string, type: string) =>
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });

//   useEffect(() => {
//     if (token) {
//       dispatch(loginSuccess());
//     }
//     // if (isLoggedIn === true) {
//     //   navigate("/user/home");
//     // }
//   }, [navigate]);

  

//   const submitHandler = async (formData: I) => {
    // userLogin(formData)
    //   .then((response) => {
    //     const token = response.token;
    //     dispatch(setToken(token));
    //     dispatch(loginSuccess());
        
        
        

    //     notify("Login success", "success");
    //     setTimeout(() => {
    //       navigate("/user/home");
    //     }, 2000);
    //   })
    //   .catch((error: any) => {
    //     notify(error.message, "error");
    //   });
//   };
  return (
    <div className="min-h-screen bg-background py-8">
        <form action="" className="lg:grid lg:grid-cols-2">
            <div className="flex-1">
                {/* Sender Form */}
                <Card className="relative mx-[10%] lg:mx-[5%] shadow-lg shadow-gray-400">
                    <CardBody className="p-4 ">
                    
                        <h1 className="font-bold">
                            SENDER
                        </h1>

                        {/* information */}
                        <div>
                            <div className="mb-4">
                                <label className="text-sm font-bold" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter the name"
                                    // {...register("confirmPassword")}
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
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter the phone number"
                                    // {...register("confirmPassword")}
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                />
                                {/* {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm">
                                    {errors.confirmPassword.message}
                                    </p>
                                )} */}
                            </div>

                            <label className="text-sm font-bold" htmlFor="address">
                                Address
                            </label>
                            <div className="flex flex-row space-x-[2%] my-[10px]">
                                <div className="flex flex-col space-y-2 w-[49%]">
                                    <input
                                        type="text"
                                        placeholder="Country"
                                        // {...register("confirmPassword")}
                                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                    {/* {errors.confirmPassword && (
                                        <p className="text-red-500 text-sm">
                                        {errors.confirmPassword.message}
                                        </p>
                                    )} */}
                                </div>
                                
                                <div className="flex flex-col space-y-2 w-[49%]">
                                    <input
                                        type="text"
                                        placeholder="Province/City"
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

                            <div className="flex flex-row space-x-[2%] my-[10px]">
                                <div className="flex flex-col space-y-2 w-[49%]">
                                    <input
                                        type="text"
                                        placeholder="District/Town"
                                        // {...register("confirmPassword")}
                                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                    {/* {errors.confirmPassword && (
                                        <p className="text-red-500 text-sm">
                                        {errors.confirmPassword.message}
                                        </p>
                                    )} */}
                                </div>

                                
                                <div className="flex flex-col space-y-2 w-[49%]">
                                    <input
                                        type="text"
                                        placeholder="Sub-district/Village"
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

                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Enter the no/hamlet/alley/lane/..."
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
                    </CardBody>
                </Card>

                {/* Receiver Form */}
                <Card className="relative mx-[10%] mt-16 lg:mx-[5%] shadow-lg shadow-gray-400">
                    <CardBody className="p-4 ">
                    
                        <h1 className="font-bold">
                            RECEIVER
                        </h1>

                        {/* information */}
                        <div>
                            <div className="mb-4">
                                <label className="text-sm font-bold" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter the name"
                                    // {...register("confirmPassword")}
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
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter the phone number"
                                    // {...register("confirmPassword")}
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                />
                                {/* {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm">
                                    {errors.confirmPassword.message}
                                    </p>
                                )} */}
                            </div>

                            <label className="text-sm font-bold" htmlFor="address">
                                Address
                            </label>
                            <div className="flex flex-row space-x-[2%] my-[10px]">
                                <div className="flex flex-col space-y-2 w-[49%]">
                                    <input
                                        type="text"
                                        placeholder="Country"
                                        // {...register("confirmPassword")}
                                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                    {/* {errors.confirmPassword && (
                                        <p className="text-red-500 text-sm">
                                        {errors.confirmPassword.message}
                                        </p>
                                    )} */}
                                </div>
                                
                                <div className="flex flex-col space-y-2 w-[49%]">
                                    <input
                                        type="text"
                                        placeholder="Province/City"
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

                            <div className="flex flex-row space-x-[2%] my-[10px]">
                                <div className="flex flex-col space-y-2 w-[49%]">
                                    <input
                                        type="text"
                                        placeholder="District/Town"
                                        // {...register("confirmPassword")}
                                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                    {/* {errors.confirmPassword && (
                                        <p className="text-red-500 text-sm">
                                        {errors.confirmPassword.message}
                                        </p>
                                    )} */}
                                </div>

                                
                                <div className="flex flex-col space-y-2 w-[49%]">
                                    <input
                                        type="text"
                                        placeholder="Sub-district/Village"
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

                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Enter the no/hamlet/alley/lane/..."
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
                    </CardBody>
                </Card>
            </div>
            
            {/* Goods */}
            <div className="flex-1">
                <Card className="relative mx-[10%] mt-16 lg:mt-0 lg:mx-[5%] shadow-lg shadow-gray-400">
                    <CardBody className="p-4 ">
                        <div>
                            <h1 className="font-bold">
                                Type of parcel
                            </h1>

                            {/* information */}
                            <div>
                                <div className="flex flex-col space-y-2 w-[49%]">
                                    <label className="font-bold">
                                        Parcel content
                                    </label>
                                    <div className="space-x-4">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                className="form-radio text-blue-600"
                                                // {...register("page2q2")}
                                            />
                                            <span className="ml-2">Document</span>
                                            </label>

                                            <label className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                className="form-radio text-blue-600"
                                                // {...register("page2q2")}
                                            />
                                            <span className="ml-2">Goods</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </form>
        

    </div>
  );
}
