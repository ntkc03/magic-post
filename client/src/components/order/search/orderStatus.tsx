import "react-toastify/dist/ReactToastify.css";


export default function OrderStatus() {

  return (
    <>
    <h1 className="flex text-2xl font-thin mt-10 mx-12 px-3">
      TRẠNG THÁI VẬN ĐƠN  
      <img
          src="https://imgur.com/5KtEikT.png"
          alt="Img"
          className="mx-4 w-10 h-full"
      />
    </h1>
    
    <div className="sm:flex sm:flex-row  mx-8">
      <div className="sm:flex-1 bg-white p-3 rounded-lg shadow-lg mx-6 my-6">
        <div className="px-3">
          <table className="min-w-full text-lg">
            <thead>
            </thead>
            <tbody>
              <tr>
                <td className="pt-2 pr-3">Mã vận đơn:</td>
                <td className="text-right pt-2">20202020</td>
              </tr>
              <tr>
                <td className="pt-2 pr-3">Người gửi:</td>
                <td className="text-right pt-2">Trần Văn H - TP Hà Nội - Quận Đống Đa</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
      
      <ol className="sm:flex-1 bg-white p-10 rounded-lg shadow-lg mx-6 my-6">
        <li className="border-l-2 border-bgBlue">
          <div className="md:flex flex-start">
            <div className="bg-bgBlue w-6 h-6 flex items-center justify-center rounded-full -ml-3.5">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" className="text-white w-3 h-3" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
              </svg>
            </div>
            <div className="block p-6 rounded-lg shadow-lg max-w-md ml-6 mb-10">
              <div className="flex justify-between mb-4">
                <a href="#!" className="font-medium text-bgBlue hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm">Giao thành công</a>
                <a href="#!" className="font-medium text-bgBlue hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm">04 / 02 / 2022</a>
              </div>
              <p className="text-gray-700">Nhân viên: Kim con cún. Bưu cục: Những người mẹ nuôi cún</p>
            </div>
          </div>
        </li>
        <li className="border-l-2 border-green-600">
          <div className="md:flex flex-start">
            <div className="bg-green-600 w-6 h-6 flex items-center justify-center rounded-full -ml-3.5">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" className="text-white w-3 h-3" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
              </svg>
            </div>
            <div className="block p-6 rounded-lg shadow-lg max-w-md ml-6 mb-10">
              <div className="flex justify-between mb-4">
                <a href="#!" className="font-medium text-bgBlue hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm">Vận chuyển</a>
                <a href="#!" className="font-medium text-bgBlue hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm">03 / 02 / 2022</a>
              </div>
              <p className="text-gray-700">Nhân viên: Kim con cún. Bưu cục: Những người mẹ nuôi cún</p>
            </div>
          </div>
        </li>
        <li className="border-l-2 border-white">
          <div className="md:flex flex-start">
            <div className="bg-green-600 w-6 h-6 flex items-center justify-center rounded-full -ml-3.5">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" className="text-white w-3 h-3" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
              </svg>
            </div>
            <div className="block p-6 rounded-lg shadow-lg max-w-md ml-6 mb-10">
              <div className="flex justify-between mb-4">
                <a href="#!" className="font-medium text-bgBlue hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm">Tạo đơn hàng</a>
                <a href="#!" className="font-medium text-bgBlue hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm">01 / 02 / 2022</a>
              </div>
              <p className="text-gray-700">Nhân viên: Kim con cún. Bưu cục: Những người mẹ nuôi cún</p>
            </div>
          </div>
        </li>
      </ol>
    </div>
    </>
  );
}
export{};