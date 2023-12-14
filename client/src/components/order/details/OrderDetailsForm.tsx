import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faEdit, faPrint } from '@fortawesome/free-solid-svg-icons';
import { orderData } from "../../../features/axios/api/order/createOrder";
import { orderInterface } from "../../../types/OrderInterface";
import configKeys from "../../../utils/config";
import { formatDate } from "./format";
import GenerateQR from "./generateQRCode";
import OrderDetails from "./orderDetails";
import PrintButton from "./print/printOrder";
import React from "react";



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
        <div className="mx-[10%] lg:mx-[5%] mb-[1%] flex justify-center md:justify-start">
            <h1 className="md:text-[30px] mr-[1%] text-[20px]">Thông tin đơn hàng</h1>
            <img
                src="https://imgur.com/5KtEikT.png"
                alt="Img"
                className="w-10 h-full"
            />
        </div>

        <div className="flex flex-col">
            <div className="inline-flex order-2 md:order-1 w-full md:justify-end justify-center">
              <div className="m-4 mr-[5%]">
              <Link to={`/order/print/${code}`}>
                  <button type="button" className="inline-flex items-center bg-blue-400 hover:bg-blue-800 text-white py-2 px-8 shadow-md rounded">
                      <FontAwesomeIcon icon={faPrint} className="mr-2" />
                          In đơn
                      </button>
              </Link>
              </div>
            </div>

            <div className="mx-[5%] order-1 md:order-2" id="elementToPrint">

                <div className="lg:grid md:grid-cols-3">
                    <div className="col-span-2 lg:mr-2">
                        <OrderDetails code={code}/>
                    </div>

                    {orderDetails?.status ? (
                        <div className="p-4 mt-4 lg:mt-0 lg:ml-2 border-b-2 border-2 border-black rounded bg-white">
                            <p className="font-bold">Hành trình đơn hàng</p>
                            {orderDetails.status.reverse().map((status, index) => (
                              <React.Fragment key={index}>
                                <div className="mb-2">
                                  <p className="p-2 text-blue-500 font-bold">
                                    <FontAwesomeIcon icon={faCircle} className="text-blue-500 mr-2" />
                                    {status.action}
                                  </p>
                                  {status.action === "Tạo đơn hàng" && (
                                    <p>
                                      {formatDate(status.date ?? new Date())}: {status.transaction}, {status.consolidation} - Nhân viên {status.staff}
                                    </p>
                                  )}
                                  {status.action === "Duyệt đơn hàng" && (
                                    <p>
                                      {formatDate(status.date ?? new Date())}: {status.transaction} - Nhân viên {status.staff}
                                    </p>
                                  )}
                                </div>
                              </React.Fragment>
                            ))}
                        </div>
                        ) : null}
                </div>         
            </div>
        </div>
        
        
    </div>
  );
}

export default OrderPrintForm;