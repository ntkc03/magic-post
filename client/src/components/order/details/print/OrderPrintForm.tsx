import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import PrintButton from "./printOrder";
import { orderData } from "../../../../features/axios/api/order/createOrder";
import { orderInterface } from "../../../../types/OrderInterface";
import configKeys from "../../../../utils/config";
import { formatDate } from "../format";
import GenerateQR from "../generateQRCode";
import OrderDetails from "../orderDetails";
import SendButton from "../../status/sendToSenderConsolidation";


interface OrderDetailsProps {
  code: string;
}

const OrderPrintForm: React.FC<OrderDetailsProps> = ({ code }) => {
  const [orderDetails, setOrderDetails] = useState<orderInterface>();


  useEffect(() => {
    const userInfo = async () => {
      const data = await orderData(code);
      setOrderDetails(data);
    };
    userInfo();
  }, []);




  useEffect(() => {
    function setPadding(){
      let header: HTMLElement | null  = document.getElementById('fixed-header');
      let container: HTMLElement | null  = document.getElementById('container');

      if(container) {
        container.style.marginTop = header?.offsetHeight + "px";
      }
    }
    setPadding();
    window.addEventListener('resize', setPadding);
  });

  return (
    <div className="min-h-screen bg-background py-8" id="container">
        <div className="mx-[10%] lg:mx-[5%] mb-[1%] flex">
            <h1 className="text-[30px] mr-[1%]">Thông tin đơn hàng</h1>
            <img
                src="https://imgur.com/5KtEikT.png"
                alt="Img"
                className="w-10 h-full"
            />
        </div>

        <div className="mx-[5%]" id="elementToPrint">
            {/* Header */}
            <div className="grid grid-cols-2">
                <div className="items-center flex w-full justify-center text-bold text-2xl font-logo">
                    MagicPost
                </div>

                {/* QR */}
                <div className="flex w-full justify-center pb-4">
                  <GenerateQR url={`${configKeys.API_URL}order/details/${code}`} />
                </div>
            </div>

            <div>
              <OrderDetails code={code}/>

              <div className="md:grid md:grid-cols-2 border-2 border-black mt-4 bg-white">
                <div className="p-4 md:border-r-black md: border-2">
                  <div className="mb-4">
                    <label className="font-bold">Cam kết của người gửi</label>
                    <p>
                      Tôi chấp nhận các điều khoản tại mặt sau của phiếu gửi và cam đoan bưu gửi này không chứ những mặt
                      hàng nguy hiểm, cấm gửi. Trường hợp không phát được hãy thực hiện "chỉ dẫn của người gửi", tôi sẽ trả cước chuyển hoàn.
                    </p>
                  </div>

                  <div>
                    <div className="mb-4">
                      <label className="font-bold">
                        Ngày giờ gửi
                      </label>
                      <p>
                        {formatDate(orderDetails?.create_at ?? new Date())}
                      </p>
                    </div>

                    <div>
                      <p className="font-bold text-center pb-16">
                        Chữ ký của người gửi
                      </p>
                    </div>

                  </div>
                </div>
                
                <div className="p-4">
                  <div>
                    <label className="font-bold">Ngày giờ nhận</label>
                    <p className="mb-8">--/--/----, --:--:-- </p>

                    <p className="font-bold text-center pb-16">Chữ ký người nhận</p>
                  </div>

                  <div className="text-center">
                    <p className="font-bold">Bưu cục chấp nhận</p>
                    <p className="pb-16">Chữ ký Giao dịch viên nhận</p>
                  </div>
                </div>
              </div>
            </div>         
        </div>
        
        <div className="flex items-center justify-center m-4">
          <PrintButton elementId="elementToPrint" />
        </div>

        
    </div>
  );
}

export default OrderPrintForm;