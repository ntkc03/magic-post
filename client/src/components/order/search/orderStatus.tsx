import "react-toastify/dist/ReactToastify.css";


export default function OrderStatus() {

  return (
    <>
    <div className="ml-10 mt-20 text-textColor">
      <h5 className="text-2xl font-bold mb-6 ml-3">Trạng thái vận đơn - draft</h5><ol>
        <li className="border-l-2 border-bgBlue">
          <div className="md:flex flex-start">
            <div className="bg-bgBlue w-6 h-6 flex items-center justify-center rounded-full -ml-3.5">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" className="text-white w-3 h-3" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
              </svg>
            </div>
            <div className="block p-6 rounded-lg shadow-lg bg-gray-100 max-w-md ml-6 mb-10">
              <div className="flex justify-between mb-4">
                <a href="#!" className="font-medium text-bgBlue hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm">Giao thành công</a>
                <a href="#!" className="font-medium text-bgBlue hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm">04 / 02 / 2022</a>
              </div>
              <p className="text-gray-700 mb-6">Nhân viên: Kim con cún. Bưu cục: Những người mẹ nuôi cún</p>
              <button type="button" className="inline-block px-4 py-1.5 bg-bgBlue text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-mdb-ripple="true">Preview</button>
              <button type="button" className="inline-block px-3.5 py-1 border-2 border-bgBlue text-bgBlue font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" data-mdb-ripple="true">See demo</button>
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
            <div className="block p-6 rounded-lg shadow-lg bg-gray-100 max-w-md ml-6 mb-10">
              <div className="flex justify-between mb-4">
                <a href="#!" className="font-medium text-bgBlue hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm">Vận chuyển</a>
                <a href="#!" className="font-medium text-bgBlue hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm">03 / 02 / 2022</a>
              </div>
              <p className="text-gray-700 mb-6">Nhân viên: Kim con cún. Bưu cục: Những người mẹ nuôi cún</p>
              <button type="button" className="inline-block px-4 py-1.5 bg-bgBlue text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-mdb-ripple="true">Preview</button>
              <button type="button" className="inline-block px-3.5 py-1 border-2 border-bgBlue text-bgBlue font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" data-mdb-ripple="true">See demo</button>
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
            <div className="block p-6 rounded-lg shadow-lg bg-gray-100 max-w-md ml-6 mb-10">
              <div className="flex justify-between mb-4">
                <a href="#!" className="font-medium text-bgBlue hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm">Tạo đơn hàng</a>
                <a href="#!" className="font-medium text-bgBlue hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm">01 / 02 / 2022</a>
              </div>
              <p className="text-gray-700 mb-6">Nhân viên: Kim con cún. Bưu cục: Những người mẹ nuôi cún</p>
              <button type="button" className="inline-block px-4 py-1.5 bg-bgBlue text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-mdb-ripple="true">Preview</button>
              <button type="button" className="inline-block px-3.5 py-1 border-2 border-bgBlue text-bgBlue font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" data-mdb-ripple="true">See demo</button>
            </div>
          </div>
        </li>
      </ol>
    </div>
    </>
  );
}
export{};