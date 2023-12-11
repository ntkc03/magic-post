

import "react-toastify/dist/ReactToastify.css";

export default function ItemDetails() {



  return (
    <div>
        <label>
            Tên hàng
        </label>

        <div className="mb-4">
            <input
                type="text"
                placeholder="Nhập tên hàng hóa"
                className="items w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
        </div>
    </div>
  );

}