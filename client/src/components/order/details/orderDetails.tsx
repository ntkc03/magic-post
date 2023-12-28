import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { orderInterface } from "../../../types/OrderInterface";
import { orderData } from "../../../features/axios/api/order/createOrder";
import OrderStatus from '../../../components/order/search/orderStatus'

//************************************
// Description: Phần thân của trang thông tin về đơn hàng.
//************************************

interface OrderDetailsProps {
    code: string;
  }
  
const OrderDetails: React.FC<OrderDetailsProps> = ({ code }) => {

  const [orderDetails, setOrderDetails] = useState<orderInterface>(); // State để lưu trữ mã vận đơn
  const [hasError, setHasError] = useState(false); // State để kiểm tra lỗi

  useEffect(() => {
    const userInfo = async () => {
      try {
        const data = await orderData(code);
        setOrderDetails(data);
        setHasError(false);
      }
      catch (error) {
        setOrderDetails(undefined);
        setHasError(true);
      }
    };
    userInfo();
  }, []);

  useEffect(() => {
    function setPadding(){
      let header: HTMLElement | null  = document.getElementById('fixed-header');
      let container: HTMLElement | null  = document.getElementById('container');

      if(container) {
        container.style.marginTop = header?.offsetHeight  + "px";
      }
    }
    setPadding();
    window.addEventListener('resize', setPadding);
  });

  return (
    <div className="bg-[url('https://i.imgur.com/Jrvywgo.png')] h-auto min-h-[1200px] py-8" id="container">

      {hasError ? (
        <div className="mt-10 text-normal text-center text-red-700">Không thể tìm thấy thông tin đơn hàng, xin hãy nhập đúng mã vận đơn</div>
      ) : (
        orderDetails && <OrderStatus result={orderDetails} />
      )}
    </div>
  );
};

export default OrderDetails;