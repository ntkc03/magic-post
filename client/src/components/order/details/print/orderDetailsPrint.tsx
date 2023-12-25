import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

import { orderInterface } from "../../../../types/OrderInterface";
import { orderData } from "../../../../features/axios/api/order/createOrder";


interface OrderDetailsProps {
  code: string;
}

const OrderDetailsPrint: React.FC<OrderDetailsProps> = ({ code }) => {
  const [orderDetails, setOrderDetails] = useState<orderInterface>();


  useEffect(() => {
    const userInfo = async () => {
      const data = await orderData(code);
      setOrderDetails(data);
    };
    userInfo();
  }, []);


  return (
    <div>
      <div className="md:grid md:grid-cols-2 ">
        <div className="border-2 border-black rounded px-4 bg-white md:mr-2 mb-4 md:mb-0">
          {/* Sender */}
          <div className="py-4 border-b-2 border-grey">
            <div>
              <p className="font-bold">
                Họ và tên người gửi
              </p>

              <p>
                {orderDetails?.senderName}
              </p>
            </div>

            <div>
              <p className="font-bold">
                Địa chỉ
              </p>

              <p>
                {
                  orderDetails?.senderHouseNumber + ", " + orderDetails?.senderVillage + ", "
                  + orderDetails?.senderDistrict + ", " + orderDetails?.senderCity + ", " + orderDetails?.senderCountry
                }
              </p>
            </div>

            <div>
              <p className="font-bold">
                Số điện thoại
              </p>

              <p>
                {orderDetails?.senderPhone}
              </p>
            </div>
          </div>
          
          {/* Receiver */}
          <div className="py-4 border-b-2 border-grey">
            <div>
              <p className="font-bold">
                Họ và tên người nhận
              </p>

              <p>
                {orderDetails?.receiverName}
              </p>
            </div>

            <div>
              <p className="font-bold">
                Địa chỉ
              </p>

              <p>
                {
                  orderDetails?.receiverHouseNumber + ", " + orderDetails?.receiverVillage + ", "
                  + orderDetails?.receiverDistrict + ", " + orderDetails?.receiverCity + ", " + orderDetails?.receiverCountry
                }
              </p>
            </div>

            <div>
              <p className="font-bold">
                Số điện thoại
              </p>

              <p>
                {orderDetails?.receiverPhone}
              </p>
            </div>
          </div>

          <div className="py-4">
            <div className="mb-4">
              <label className="font-bold">Cước</label>

              <div className="grid grid-cols-2">
                <label>Cước chính</label>
              <p className="text-right">{orderDetails?.mainFee} đ</p>
              </div>

              <div className="grid grid-cols-2">
                <label>Phụ phí</label>
              <p className="text-right">{orderDetails?.additionalFee} đ</p>
              </div>

              <div className="grid grid-cols-2">
                <label>Cước GTGT</label>
                <p className="text-right">{orderDetails?.GTGTFee} đ</p>
              </div>

              <div className="grid grid-cols-2">
                <label>Tổng cước (bao gồm VAT)</label>
                <p className="text-right">{orderDetails?.VAT} đ</p>
              </div>

              <div className="grid grid-cols-2">
                <label>Thu khác</label>
                <p className="text-right">{orderDetails?.otherFee} đ</p>
              </div>

              <div className="grid grid-cols-2 font-bold">
                <label>Tổng thu</label>
                <p className="text-right">{orderDetails?.sumFee} đ</p>
              </div>
              
            </div>
          </div>
          
          
        </div>

        <div className="border-2 border-black rounded px-4 bg-white md:ml-2">
          <div className="py-4 border-b-2 border-grey">
              <label className="font-bold">
                  Loại hàng gửi
              </label>
              <div className="md:space-x-4 my-2 grid md:grid-cols-2">
                  <label className="inline-flex items-center">
                      <input
                          type="checkbox"
                          className="form-radio text-blue-600"
                          checked={orderDetails?.type === true}
                      />
                      <span className="ml-2">Hàng hóa</span>
                  </label>

                  <label className="inline-flex items-center">
                  <input
                      type="checkbox"
                      className="form-radio text-blue-600"
                      checked={orderDetails?.type === false}
                  />
                  <span className="ml-2">Tài liệu</span>
                  </label>
              </div>
          </div>

          <div className="py-4 border-b-2 border-grey">
            <label className="font-bold">
              Nội dung giá trị bưu gửi
            </label>

            <table className="w-full border text-center">
                <thead>
                    <tr>
                        <th className="border p-2">Nội dung</th>
                        <th className="border p-2">Số lượng</th>
                        <th className="border p-2">Trị giá</th>
                        <th className="border p-2">Giấy tờ đính kèm</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border p-2">Tổng</td>
                        <td className="border p-2">{orderDetails?.items?.length}</td>
                        <td className="border p-2">{orderDetails?.cost}</td>
                        <td className="border p-2">Không có</td>
                    </tr>
                </tbody>
            </table>
          </div>


          <div className="py-4 border-b-2 border-grey">
            <label className="font-bold">Danh sách hàng hóa</label>
            <p>{orderDetails?.items?.join(', ')}</p>
          </div>
          
          <div className="py-4 border-b-2 border-grey">
            <label className="font-bold">Dịch vụ cộng thêm</label>
            <p>{orderDetails?.specialService?.join(', ')}</p>
          </div>
          
          <div className="py-4 border-b-2 border-grey">
          <label className="text-sm font-bold" htmlFor="name">
                Chỉ dẫn của người gửi khi không phát được bưu gửi:
            </label>

            <div>
              {[
                  { label: 'Chuyển hoàn ngay', value: 'returnImmediately' },
                  { label: 'Gọi điện cho người gửi', value: 'callSender' },
                  { label: 'Chuyển hoàn trước ngày', value: 'returnBeforeDate' },
                  { label: 'Chuyển hoàn khi hết thời gian lưu trữ', value: 'returnWhenStorageExpires' },
                  { label: 'Hủy', value: 'cancel' },
              ].map((option) => (
                  <label key={option.value} className="flex items-center">
                  <input
                      value={option.label}
                      type="checkbox"
                      checked={orderDetails?.cannotDelivered === option.label}
                      className="guides form-checkbox text-blue-600"
                  />
                  <span className="ml-2">{option.label}</span>
                  </label>
              ))}
            </div>

          </div>

          <div className="py-4">
            <div className="mb-4">
              <label className="font-bold">Thu của người nhận</label>

              <div className="grid grid-cols-2">
                <label>COD</label>
                <p className="text-right">{orderDetails?.COD} đ</p>
              </div>

              <div className="grid grid-cols-2">
                <label>Thu khác</label>
                <p className="text-right">{orderDetails?.other} đ</p>
              </div>

              <div className="grid grid-cols-2 font-bold">
                <label>Tổng thu</label>
                <p className="text-right">{orderDetails?.sum} đ</p>
              </div>
            </div>
            

            <label className="font-bold">Khối lượng (kg)</label>
            <div className="grid grid-cols-2">
              <label>Khối lượng thực tế</label>
              <p className="text-right">{orderDetails?.weight} g</p>
            </div>
          </div>

        </div>


      </div>
    </div>         
  );
}

export default OrderDetailsPrint;