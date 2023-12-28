import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { orderInterface } from "../../../types/OrderInterface";
import { orderData } from "../../../features/axios/api/order/createOrder";
import OrderStatus from '../../../components/order/search/orderStatus'

//************************************
// Description: Phần thân của trang Tra cứu vận đơn của người dùng.
//************************************

const SearchBox = () => {
  const [orderDetails, setOrderDetails] = useState<orderInterface>(); // State để lưu trữ mã vận đơn
  const [searchCode, setSearchCode] = useState(""); // State để lưu trữ kết quả tìm kiếm
  const [hasError, setHasError] = useState(false); // State để kiểm tra lỗi

  // Xử lý tìm kiếm đơn theo mã code.
  const handleSearch = async () => {
    try {
      const data = await orderData(searchCode);
      setOrderDetails(data);
      setHasError(false);
    }
    catch (error) {
      setOrderDetails(undefined);
      setHasError(true);
    }
  };

  return (
    <div className="bg-[url('https://i.imgur.com/Jrvywgo.png')] h-auto min-h-[1200px]">
      <div className="flex justify-center items-center mx-auto mt-10">
        <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
        <input
        type="text"
        placeholder="Nhập mã vận đơn"
        value={searchCode}
        onChange={(e) => setSearchCode(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
        />
        <button 
          onClick={handleSearch}
          className="m-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
        >Tìm kiếm</button>
      </div>
      

      {/* Hiển thị kết quả tìm kiếm */}
      {hasError ? (
        <div className="mt-10 text-normal text-center text-red-700">Không thể tìm thấy thông tin đơn hàng, xin hãy nhập đúng mã vận đơn</div>
      ) : (
        orderDetails && <OrderStatus result={orderDetails} />
      )}
    </div>
  );
};

export default SearchBox;