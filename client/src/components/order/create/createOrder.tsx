import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../../../features/redux/slices/user/tokenSlice";
import { useSelector, useDispatch } from "react-redux/es/exports";
// import { RootState } from "../../../features/redux/reducers/Reducer";
// import { loginSuccess } from "../../../features/redux/slices/user/userLoginAuthSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { updateOrder } from "../../../features/axios/api/order/createOrder";
import { orderInterface } from "../../../types/OrderInterface";
import SenderInformation from "./elements/senderInformation";
import ReceiverInformation from "./elements/receiverInformation";
import GoodsInformation from "./elements/goodsInformation";
import { costCalcu} from "./calculation";

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

  

  useEffect(() => {
    function setPadding(){
      let padding: HTMLElement | null = document.getElementById('padding');
      let fixed: HTMLElement | null  = document.getElementById('fixed');

      let header: HTMLElement | null  = document.getElementById('fixed-header');
      let container: HTMLElement | null  = document.getElementById('container');
  
      if(padding) {
          padding.style.height = fixed?.offsetHeight + 'px';
      }

      if(container) {
        container.style.marginTop = header?.offsetHeight + "px";
      }
      
  
    }
    setPadding();
    window.addEventListener('resize', setPadding);
  });




  let totalWeight = 0;
  useEffect(() => {
    const sender = document.getElementById("city") as HTMLSelectElement;
    const receiver = document.getElementById("cityz") as HTMLSelectElement;
    const totalW = document.getElementById("total-weight") as HTMLInputElement;

    let senderCity =  sender.value;
    let receiverCity = receiver.value;
    totalWeight = parseInt(totalW.value);

    function setTotalValue() {
      const fee = document.getElementById("fee") as HTMLElement;
      const time = document.getElementById("time") as HTMLElement;
      if (senderCity!="" && receiverCity !="" && totalWeight != 0 && !Number.isNaN(totalWeight)) {
        const fetchData = async () => {
          const { totalFee, estimatedTime } = await costCalcu(senderCity, receiverCity, totalWeight);
          var f = totalFee.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
          fee.innerText = `${f}`;
          time.innerText = `${estimatedTime} ngày`;
        };
    
        fetchData();
      } else {
        fee.innerText = `0 VND`;
        time.innerText = `0 ngày`;
      }
    }

    sender.addEventListener("change", (event) => {
      // The value of the senderCity has changed
      senderCity = (event.target as HTMLSelectElement).value;
      console.log("sender")
      setTotalValue();
    });

    receiver.addEventListener("change", (event) => {
      // The value of the senderCity has changed
      receiverCity = (event.target as HTMLSelectElement).value;
      console.log("receiver") 
      setTotalValue();
    });

    totalW.addEventListener("change", (event) => {
      // The value of the senderCity has changed
      totalWeight = parseInt((event.target as HTMLSelectElement).value);
      console.log("weight") 
      setTotalValue();
    });
    
  });
  
    
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
    <div className="min-h-screen bg-background py-8" id="container">
        <div className="mx-[10%] lg:mx-[5%] mb-[1%] flex">
            <h1 className="text-[30px] mr-[1%]">Tạo đơn</h1>
            <img
                src="https://imgur.com/5KtEikT.png"
                alt="Img"
                className="w-10 h-full"
            />
        </div>
        <form onSubmit={handleSubmit(submitHandler)} className="lg:grid lg:grid-cols-2">
            <div className="flex-1">
                <SenderInformation/>
                <ReceiverInformation/>
            </div>
            
            {/* Goods */}
            <div className="flex-1 mb-8">
                <GoodsInformation/>
            </div>

            <div id='padding' className="hidden md:block">
                {/* Some space (adjust the margin-bottom value as needed) */}
            </div>

            {/* Money */}

            <div id='fixed' className="md:mx-[0%] md:w-[88%] md:fixed md:bottom-0 md:left-1/2 md:transform md:-translate-x-1/2 md:z-10 lg:grid lg:grid-cols-6 mx-[5%] bg-white rounded border-[3px] border-gray-400 my-[5px]">
                 <div className="grid md:col-span-3 md:grid-cols-3 md:text-center">
                    <div className="grid grid-cols-2 md:grid-cols-1 md:p-4 p-2 md:border-r-[3px] border-gray-300 border-b-[3px] lg:border-b-[0px]">
                        <p className="lg:mb-2">Tổng cước</p>
                        <p id="fee" className="md:text-center text-right">0 VND</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-1 md:p-4 p-2 md:border-r-[3px] border-gray-300 border-b-[3px] lg:border-b-[0px]">
                        <p className="lg:mb-2">Tiền thu hộ</p>
                        <p className="md:text-center text-right">0 VND</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-1 md:p-4 p-2 lg:border-r-[3px] border-gray-300 border-b-[3px] lg:border-b-[0px]">
                        <p className="lg:mb-2">Thời gian dự kiến</p>
                        <p id="time" className="md:text-center text-right">0 ngày</p>
                    </div>
                 </div>


                 <div className="col-span-3 py-4 grid lg:grid-cols-3 grid-cols-1 flex items-center">
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
