import "react-toastify/dist/ReactToastify.css";
import { orderInterface } from "../../../types/OrderInterface";
import { formatDate } from "../details/format";

interface SearchBoxProps {
  result: orderInterface
}

const OrderStatus: React.FC<SearchBoxProps> = ({ result }) => {
  if (!result || !result.status) {
    // Handle the case where result or result.Status is undefined
    return null; // or display a loading message or default content
  }
  return (
    <>
      <h1 className="flex text-3xl font-thin mt-10 mx-12 px-3">
        TRẠNG THÁI VẬN ĐƠN
        <img
          src="https://imgur.com/5KtEikT.png"
          alt="Img"
          className="mx-4 w-10 h-full"
      />
    </h1>
    
    <div className="lg:flex lg:flex-row  mx-8">
      <div className="lg:flex-1 bg-white p-3 rounded-lg shadow-lg mx-6 my-6">
        <div className="px-3">
          <table className="min-w-full text-base mt-5">
            <thead>
            </thead>
            <tbody>
              <tr>
                <td className="pt-2 pr-3">Mã vận đơn:</td>
                <td className="text-right text-bgBlue pt-2">{result.code}</td>
              </tr>
              <tr>
                <td className="pt-2 pr-3">Người gửi:</td>
                <td className="text-right text-bgBlue pt-2">{result.senderName} - {result.senderDistrict} - {result.senderCity}</td>
              </tr>
              <tr>
                <td className="pt-2 pr-3">Người nhận:</td>
                <td className="text-right text-bgBlue pt-2">{result.receiverName} - {result.receiverDistrict} - {result.receiverCity}</td>
              </tr>
              <tr>
                <td className="pt-2 pr-3">Loại hàng gửi:</td>
                <td className="text-right text-bgBlue pt-2">{result.type? "Hàng hóa" : "Tài liệu"}</td>
              </tr>
              <tr>
                <td className="pt-2 pr-3">Khối lượng:</td>
                <td className="text-right text-bgBlue pt-2">{result.weight} g</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
      
      <ol className="lg:flex-1 bg-white p-10 rounded-lg shadow-lg mx-6 my-6">
          {[...result.status].reverse().map((status, index) => (
            <li key={index} className={`border-l-2 border-bgBlue`}>
              <div className="md:flex flex-start">
                <div className="bg-bgBlue w-6 h-6 flex items-center justify-center rounded-full -ml-3.5">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" className="text-white w-3 h-3" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
                  </svg>
                </div>
                <div className="block p-6 rounded-lg shadow-lg w-full ml-6 mb-10">
                  <div className="grid grid-cols-4 mb-4">
                    <p className="col-span-3 font-medium text-bgBlue hover:text-blue-700 duration-300 transition ease-in-out text-lg">{status.action}</p>
                    <p className="text-right font-medium text-bgBlue hover:text-blue-700 duration-300 transition ease-in-out text-md">{formatDate(status.date?? new Date())}</p>
                  </div>
                  {(status.action === "Nhận đơn hàng" || status.action === "Đang gửi đến điểm tập kết") && (
                    <p className="text-gray-700">Nhân viên: {status.staff}. Điểm giao dịch: {status.fromTransaction}</p>
                  )}

                  {(status.action === "Điểm tập kết đã nhận" || status.action === "Đang gửi đến điểm tập kết đích") && (
                    <p className="text-gray-700">Nhân viên: {status.staff}. Điểm tập kết: {status.fromConsolidation}</p>
                  )}

                  {(status.action === "Điểm tập kết đích đã nhận" || status.action === "Đang gửi đến điểm giao dịch đích") && (
                    <p className="text-gray-700">Nhân viên: {status.staff}. Điểm tập kết: {status.fromConsolidation}</p>
                  )}

                  {(status.action === "Điểm giao dịch đích đã nhận" || status.action === "Đang giao hàng") && (
                    <p className="text-gray-700">Nhân viên: {status.staff}. Điểm giao dịch: {status.fromTransaction}</p>
                  )}

                  {(status.action === "Giao hàng thành công") && (
                    <p className="text-gray-700">Nhân viên xác nhận: {status.staff}.</p>
                  )}

                  {(status.action === "Giao hàng không thành công") && (
                    <p className="text-gray-700">Nhân viên xác nhận: {status.staff}. Lý do: {status.note}. Chỉ dẫn: {status.guide}</p>
                  )}
                  
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
export default OrderStatus;
export { };