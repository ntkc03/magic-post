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
import { employerData } from "../../../features/axios/api/employer/userDetails";
import { fetchUser, clearUserDetails } from "../../../features/redux/slices/user/userDetailsSlice";
import { employerInterface} from "../../../types/EmployerInterface";
import { getTransactionByAddress, updateTransaction } from "../../../features/axios/api/transaction/transactionPointDetails";
import { TransactionInterface } from "../../../types/TransactionInterface";

//************************************
// Description: Phần thân trang tạo đơn mới của nhân viên.
//************************************

// Token sử dụng khi trước đó đã lưu mã thông báo xác thực của người dùng 
// vào bộ nhớ cục bộ sau khi đăng nhập thành công
const token = localStorage.getItem("token");
// Bộ tạo mã code ngẫu nhiên
const code = String(Math.floor(Math.random() * 1000000000) + 10000000000);

export default function CreateOrder() {
  // Kích hoạt hành động và sửa đổi trạng thái trong ứng dụng react.
  const dispatch = useDispatch();
  // Cho phép điều hướng theo chương trình đến các tuyến khác nhau trong ứng dụng.
  const navigate = useNavigate();

  // Cài đặt dữ liệu và hành động submit form có đối tượng là orderInterface.
  const {
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<orderInterface>({
    resolver: yupResolver(orderValidationSchema)
  });


  // Thành phần và hàm thay đổi trạng thái của thành phần.
  const [employerDetails, setEmployerDetails] = useState<employerInterface>();
  const [employerDetailsLoaded, setEmployerDetailsLoaded] = useState(false);

  // Sau khi đăng nhập, lấy dữ liệu liên quan của nhân viên và lưu trữ vào emPloyerDetails.
  useEffect(() => {
    if (token) {
      dispatch(fetchUser());
      const employerDetails = async () => {
        const data = await employerData();
        setEmployerDetails(data);
        setEmployerDetailsLoaded(true);
      };
      employerDetails();
    }
    return () => {
      dispatch(clearUserDetails());
    };
  }, [dispatch]);


  // Khi các thành phần của trang thay đổi, thay đổi giá trị của form và hàm tính cước phí và thời gian dự tính.
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

  // Đặt giá trị cho các trường lấy từ giá trị của các đối tượng input trong form.
  const setFormValue = async () =>{
    // Người gửi
    const senderName = document.getElementById("senderName") as HTMLInputElement;
    const senderCity = document.getElementById("senderCity") as HTMLSelectElement;
    const senderCountry = document.getElementById("senderCountry") as HTMLSelectElement;
    const senderDistrict = document.getElementById("senderDistrict") as HTMLSelectElement;
    const senderVillage = document.getElementById("senderVillage") as HTMLSelectElement;
    const senderHouseNumber = document.getElementById("senderHouseNumber") as HTMLInputElement;
    const senderPhone = document.getElementById("senderPhone") as HTMLInputElement;

    // Người nhận
    const receiverName = document.getElementById("receiverName") as HTMLInputElement;
    const receiverCity = document.getElementById("receiverCity") as HTMLSelectElement;
    const receiverCountry = document.getElementById("receiverCountry") as HTMLSelectElement;
    const receiverDistrict = document.getElementById("receiverDistrict") as HTMLSelectElement;
    const receiverVillage = document.getElementById("receiverVillage") as HTMLSelectElement;
    const receiverHouseNumber = document.getElementById("receiverHouseNumber") as HTMLInputElement;
    const receiverPhone = document.getElementById("receiverPhone") as HTMLInputElement;

    // Loại hàng
    const types = document.querySelectorAll<HTMLInputElement>('.type');
    

    // Các đặc tính của hàng
    const features = document.querySelectorAll<HTMLInputElement>('.features');
    const specialServices: string[] = [];

    // Hướng dẫn khi không gửi được hàng
    const guides = document.querySelectorAll<HTMLInputElement>('.guides');
    const cannotDelivered: string[] = [];

    // Danh sách hàng hóa.
    const itemsElement = document.querySelectorAll<HTMLInputElement>('.items');
    const items: string[] = [];

    // Tiền thu hộ
    const cod = document.getElementById("COD") as HTMLInputElement;
    const totalCod = document.getElementById("total-cod") as HTMLElement;

    // Khối lượng, ước tính giá cước và ghi chú.
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


    // Nếu không thu hộ, mặc định giá trị bằng 0
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

    // nếu loại là Hàng hóa, type = 1, còn nếu hàng là Tài liệu thì type = 0.
    if (types[0].checked) {
      setValue('type', true)
    } else {
      setValue('type', false)
    }

    // Lấy từng đặc trưng của hàng hóa và lưu vào một mảng.
    for (let i = 0; i < features.length; i++) {
      if (features[i].checked) {
        specialServices.push(features[i].value);
      }
    }

    // Lấy hướng dẫn khi không gửi được hàng hóa và lưu vào mảng.
    for (let i = 0; i < guides.length; i++) {
      if (guides[i].checked) {
        cannotDelivered.push(guides[i].value);
      }
    }

    // Lấy danh sách hàng hóa và lưu vào mảng.
    for (let i = 0; i < itemsElement.length; i++) {
      items.push(itemsElement[i].value)
    }

    setValue('specialService', specialServices)
    setValue('cannotDelivered', cannotDelivered[0])
    setValue('items', items)

    // Thêm trạng thái của đơn hàng. Khởi tạo trạng thái "Nhận đơn hàng".
    if (employerDetailsLoaded) {
      let status: Status = {
        action: "Nhận đơn hàng",
        fromConsolidation: employerDetails?.consolidation,
        fromTransaction: employerDetails?.transaction,
        toConsolidation: employerDetails?.consolidation,
        toTransaction: employerDetails?.transaction,
        date: new Date(),
        staff: employerDetails?.name,
      };


      // Thêm trạng thái mới vừa tạo vào mảng statuses và lưu vào form.
      let statuses: Array<Status> = [];
      statuses.push(status)
      setValue("status", statuses)
    }
  }


  let totalWeight = 0;
  // Hàm tính cước phí và thời gian giao hàng dự kiến. 
  // Bước 1: Lấy thông tin về tỉnh/thành phố gửi/nhận và khối lượng của hàng hóa thông qua id của input đó.
  // Bước 2: Lấy các đối tượng fee và time và dùng hàm costCalcu để tính
  // Bước 3: Đặt dữ liệu vào đối tượng form gửi đi.
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

  // Set padding cho phần thân để đoạn cuối của phần thân không bị che khuất bới fixed footer.
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

  // Thông báo đơn hàng tạo thành công/thất bại
  const notify = (msg: string, type: string) =>
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.BOTTOM_RIGHT })
      : toast.success(msg, { position: toast.POSITION.BOTTOM_RIGHT });


  // Xử lý submit form data
  const submitHandler = async (formData: orderInterface) => {
    // Cập nhật số lượng hàng hóa ở điểm tập kết lên 1.
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

    // Tạo dữ liệu đơn hàng lên database.
    createOrder(formData)
      .then((response: any) => {
        notify("Tạo đơn hàng thành công!", "success");
        setTimeout(() => {
          navigate(`/order/print/${code}`);
        }, 500);
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
              {/* Người gửi */}
              <SenderInformation errors={errors}/>
              {/* Người nhận */}
              <ReceiverInformation errors={errors}/>
            </div>
            
            {/* Hàng hóa */}
            <div className="flex-1 mb-8">
                <GoodsInformation errors={errors}/>
            </div>

            <div id='padding' className="hidden md:block">
            </div>

            {/* Thông tin về đơn.*/}
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
        <ToastContainer />
    </div>
  );
}
