import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
// import { RootState } from "../../../features/redux/reducers/Reducer";
// import { loginSuccess } from "../../../features/redux/slices/user/userLoginAuthSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import GenerateQR from "./generateQRCode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import PrintButton from "./printOrder";
import { orderInterface } from "../../../types/OrderInterface";
import { orderData } from "../../../features/axios/api/order/createOrder";
import {format, isValid} from "date-fns"
import configKeys from "../../../utils/config";

interface OrderDetailsProps {
  code: string;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ code }) => {
  const [orderDetails, setOrderDetails] = useState<orderInterface>();

  useEffect(() => {
    const userInfo = async () => {
      const data = await orderData(code);
      setOrderDetails(data);
    };
    userInfo();
  }, []);

  const formattedDate = new Date(orderDetails?.create_at?.toString() ?? "").toLocaleString('en-ID', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });



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

            <div className="bg-white border-2 border-black">
              
              <div className="md:grid md:grid-cols-2 border-b-2 border-black">
                {/* Sender */}
                <div className="p-4 md:border-r-2 md:border-b-0 border-b-2 border-black">
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
                <div className="p-4">
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
              </div>

              <div className="md:grid md:grid-cols-2 border-b-2 border-black">
                <div className="p-4 md:border-r-2 md:border-b-0 border-b-2 border-black">
                  <div className="mb-2">
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
                              <span className="ml-2">Tài liệu</span>
                          </label>

                          <label className="inline-flex items-center">
                          <input
                              type="checkbox"
                              className="form-radio text-blue-600"
                              checked={orderDetails?.type === false}
                          />
                          <span className="ml-2">Hàng hóa</span>
                          </label>
                      </div>
                  </div>

                  <div className="mb-2">
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

                  <div className="mb-2">
                    <label className="font-bold">Dịch vụ cộng thêm</label>
                    <p>{orderDetails?.specialService?.join(', ')}</p>
                  </div>

                </div>
                
                <div className="p-4">
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

              </div>

              <div className="md:grid md:grid-cols-2 border-b-2 border-black">
                <div className="p-4 md:border-r-2 md:border-b-0 border-b-2 border-black">
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
                
                <div className="p-4">
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

              <div className="md:grid md:grid-cols-2 ">
                <div className="p-4 md:border-r-2 md:border-b-0 border-b-2  border-black">
                  <div className="mb-2">
                    <label className="font-bold">Cam kết của người gửi</label>
                    <p>
                      Tôi chấp nhận các điều khoản tại mặt sau của phiếu gửi và cam đoan bưu gửi này không chứ những mặt
                      hàng nguy hiểm, cấm gửi. Trường hợp không phát được hãy thực hiện "chỉ dẫn của người gửi", tôi sẽ trả cước chuyển hoàn.
                    </p>
                  </div>

                  <div>
                    <div className="mb-2">
                      <label className="font-bold">
                        Ngày giờ gửi
                      </label>
                      <p>
                        {formattedDate}
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
        
        <div className="grid grid-cols-2">
          <div className="flex items-center justify-end m-4">
          <Link to={"/employer/order/new"}>
              <button type="button" className="inline-flex items-center bg-blue-400 hover:bg-blue-800 text-white py-2 px-4 shadow-md rounded">
              <FontAwesomeIcon icon={faEdit} className="mr-2" />
                  Chỉnh sửa
              </button>
          </Link>
          </div>

          <div className="flex items-center justify-start m-4">
            <PrintButton elementId="elementToPrint" />
          </div>
        </div>
        
    </div>
  );
}

export default OrderDetails;