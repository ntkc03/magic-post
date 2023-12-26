import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { set, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createOrder, updateOrder } from "../../../features/axios/api/order/createOrder";
import { Status, orderInterface } from "../../../types/OrderInterface";
import SenderInformation from "./elements/senderInformation";
import ReceiverInformation from "./elements/receiverInformation";
import GoodsInformation from "./elements/goodsInformation";
import { costCalcu} from "./calculation";
import { orderValidationSchema } from "../../../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../features/redux/reducers/Reducer";
import { employerData } from "../../../features/axios/api/employer/userDetails";
import { fetchUser, clearUserDetails } from "../../../features/redux/slices/user/userDetailsSlice";
import { employerInterface} from "../../../types/EmployerInterface";
import { getConsolidationByAddress, updateConsolidation } from "../../../features/axios/api/consolidation/consolidationPointDetails";
import { ConsolidationInterface } from "../../../types/ConsolidationInterface";
import { getTransactionByAddress, updateTransaction } from "../../../features/axios/api/transaction/transactionPointDetails";
import { TransactionInterface } from "../../../types/TransactionInterface";





const token = localStorage.getItem("token");
const code = String(Math.floor(Math.random() * 1000000000) + 10000000000);



export default function CreateOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<orderInterface>({
    resolver: yupResolver(orderValidationSchema)
  });


  const [employerDetails, setEmployerDetails] = useState<employerInterface>();
  const [employerDetailsLoaded, setEmployerDetailsLoaded] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(fetchUser());
      const employerDetails = async () => {
        const data = await employerData();
        setEmployerDetails(data);
        setEmployerDetailsLoaded(true); // Make sure this line is here
      };
      employerDetails();
    }
    return () => {
      dispatch(clearUserDetails());
    };
  }, [dispatch]);


  useEffect(() => { 
    const handleDocumentChange = () => {
      setFormValue();
      setTotalValue();
    };
    document.addEventListener("change", handleDocumentChange);
    return () => {
      document.removeEventListener("change", handleDocumentChange);
    };
  });

  const setFormValue = async () =>{
    const senderName = document.getElementById("senderName") as HTMLInputElement;
    const senderCity = document.getElementById("senderCity") as HTMLSelectElement;
    const senderCountry = document.getElementById("senderCountry") as HTMLSelectElement;
    const senderDistrict = document.getElementById("senderDistrict") as HTMLSelectElement;
    const senderVillage = document.getElementById("senderVillage") as HTMLSelectElement;
    const senderHouseNumber = document.getElementById("senderHouseNumber") as HTMLInputElement;
    const senderPhone = document.getElementById("senderPhone") as HTMLInputElement;

    const receiverName = document.getElementById("receiverName") as HTMLInputElement;
    const receiverCity = document.getElementById("receiverCity") as HTMLSelectElement;
    const receiverCountry = document.getElementById("receiverCountry") as HTMLSelectElement;
    const receiverDistrict = document.getElementById("receiverDistrict") as HTMLSelectElement;
    const receiverVillage = document.getElementById("receiverVillage") as HTMLSelectElement;
    const receiverHouseNumber = document.getElementById("receiverHouseNumber") as HTMLInputElement;
    const receiverPhone = document.getElementById("receiverPhone") as HTMLInputElement;

    const types = document.querySelectorAll<HTMLInputElement>('.type');
    

    const features = document.querySelectorAll<HTMLInputElement>('.features');
    const specialServices: string[] = [];

    const guides = document.querySelectorAll<HTMLInputElement>('.guides');
    const cannotDelivered: string[] = [];

    const itemsElement = document.querySelectorAll<HTMLInputElement>('.items');
    const items: string[] = [];

    const cod = document.getElementById("COD") as HTMLInputElement;
    const totalCod = document.getElementById("total-cod") as HTMLElement;

    const weight = document.getElementById("total-weight") as HTMLInputElement;
    const cost = document.getElementById("total-cost") as HTMLInputElement;
    const note = document.getElementById("note") as HTMLInputElement;

    setValue('senderName', senderName.value)
    setValue('senderCountry', senderCountry.value)
    setValue('senderCity', senderCity.value)
    setValue('senderDistrict', senderDistrict.value)
    setValue('senderVillage', senderVillage.value)
    setValue('senderHouseNumber', senderHouseNumber.value)
    setValue('senderPhone', senderPhone.value)

    setValue('receiverName', receiverName.value)
    setValue('receiverCountry', receiverCountry.value)
    setValue('receiverCity', receiverCity.value)
    setValue('receiverDistrict', receiverDistrict.value)
    setValue('receiverVillage', receiverVillage.value)
    setValue('receiverHouseNumber', receiverHouseNumber.value)
    setValue('receiverPhone', receiverPhone.value)


    if (Number.isNaN(parseInt(cod.value))) {
      cod.value = '0';
    }
    setValue('COD', parseInt(cod.value))
    totalCod.innerText =  `${parseInt(cod.value).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}`;

    setValue('other',0)
    setValue('sum', parseInt(cod.value))

    setValue('weight', parseInt(weight.value))
    setValue('cost', parseInt(cost.value))
    setValue('note', note.value)

    setValue('code', code);

    if (types[0].checked) {
      setValue('type', true)
    } else {
      setValue('type', false)
    }

    for (let i = 0; i < features.length; i++) {
      if (features[i].checked) {
        specialServices.push(features[i].value);
      }
    }

    for (let i = 0; i < guides.length; i++) {
      if (guides[i].checked) {
        cannotDelivered.push(guides[i].value);
      }
    }

    for (let i = 0; i < itemsElement.length; i++) {
      items.push(itemsElement[i].value)
    }
    setValue('specialService', specialServices)
    setValue('cannotDelivered', cannotDelivered[0])
    setValue('items', items)

    if (employerDetailsLoaded) {
      let status: Status = {
        action: "Nhận đơn hàng",
        consolidation: employerDetails?.consolidation,
        transaction: employerDetails?.transaction,
        date: new Date(),
        staff: employerDetails?.name,
        place: "transaction",
      };


      let statuses: Array<Status> = [];
      statuses.push(status)
      setValue("status", statuses)
    }
  }


  let totalWeight = 0;
  const setTotalValue = async () => {
    const sender = document.getElementById("senderCity") as HTMLSelectElement;
    const receiver = document.getElementById("receiverCity") as HTMLSelectElement;
    const totalW = document.getElementById("total-weight") as HTMLInputElement;

    let senderCity =  sender.value;
    let receiverCity = receiver.value;
    totalWeight = parseInt(totalW.value);

    const fee = document.getElementById("fee") as HTMLElement;
    const time = document.getElementById("time") as HTMLElement;
    if (senderCity!="" && receiverCity !="" && totalWeight != 0 && !Number.isNaN(totalWeight)) {
      try {
        const { totalFee, estimatedTime } = await costCalcu(senderCity, receiverCity, totalWeight);
        var f = totalFee.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        fee.innerText = `${f}`;
        time.innerText = `${estimatedTime} ngày`;
        setValue('mainFee', totalFee)
        setValue('additionalFee', 0)
        setValue('GTGTFee', 0)
        setValue('otherFee', 0)
        setValue('sumFee', totalFee)
        setValue('estimatedTime', estimatedTime)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      fee.innerText = `0 VND`;
      time.innerText = `0 ngày`;

      setValue('mainFee', 0)
      setValue('additionalFee', 0)
      setValue('GTGTFee', 0)
      setValue('otherFee', 0)
      setValue('sumFee', 0)
      setValue('estimatedTime', 0)
    }
  }


  


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

  
  

  const notify = (msg: string, type: string) =>
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });


  const submitHandler = async (formData: orderInterface) => {
    
    const update = async () => {

      if (formData.senderVillage && formData.senderDistrict) {
        const data: TransactionInterface = await getTransactionByAddress(formData.senderVillage, formData.senderDistrict);
        if (data && data.quantity !== undefined) {
          data.quantity = data.quantity + 1;
          console.log(data.quantity)
        } else {
          data.quantity = 1;
        }
        updateTransaction(data);
      }
    };
    update();

    createOrder(formData)
      .then((response: any) => {
        notify("Create a new order successfully", "success");
        setTimeout(() => {
          navigate(`/order/print/${code}`);
        }, 200);
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
              <SenderInformation errors={errors}/>

                <ReceiverInformation errors={errors}/>
            </div>
            
            {/* Goods */}
            <div className="flex-1 mb-8">
                <GoodsInformation errors={errors}/>
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
                        <p id='total-cod'className="md:text-center text-right">0 VND</p>
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
