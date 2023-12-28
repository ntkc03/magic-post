import React, { useState, useEffect } from 'react';

//************************************
// Description: Phần bảng giá cước và thời gian dự kiến theo từng khu vực và khối lượng của hàng hóa.
//************************************

// Đối tượng lưu thông tin về loại vận chuyển, giá cước theo khối lượng và thời gian ước tính.
interface ShippingType {
  type: string;
  pricing: number[];
  estimateTime: number;
}

// Đối tượng lưu trữ 3 đối tượng vận chuyển (nội tỉnh, nội miền, liên miền)
interface ShippingData {
  [key: string]: ShippingType;
}

const apiUrl = 'https://api.npoint.io/78054097cc581e7db9eb';

const ShippingTable: React.FC = () => {
  // Thành phần và hàm thay đổi trạng thái (state) của một thành phần.
  const [shippingData, setShippingData] = useState<ShippingData>({});

  // Hàm lấy dữ liệu json từ api và lưu trữ vào thành phần shippingData.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch the data. Status: ${response.status}`);
        }
        const data = await response.json();
        setShippingData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Mảng lưu các miền khối lượng chia giá của mỗi loại theo khối lượng tương ứng.
  const weightRanges = [
    '0 - 50',
    '50 - 100',
    '100 - 250',
    '250 - 500',
    '500 - 1000',
    '1000 - 1500',
    '1500 - 2000',
    "mỗi 0,5kg tiếp theo"
  ];

  // Return bảng giá cước và thời gian dự kiến theo từng khu vực và khối lượng của hàng hóa.
  return (
    <div className="overflow-x-auto text-center">
      <table className="min-w-full border-collapse border border-blue-700">
        <thead className="bg-blue-500">
          <tr>
            <th className="border border-blue-700 px-4 py-2 text-white">Trọng lượng</th>
            {/* Loại của mỗi đối tượng của shippingData sẽ là một cột header của bảng.*/}
            {Object.keys(shippingData).map((key) => (
              <th key={key} className="border border-blue-700 text-white px-4 py-2">{shippingData[key].type}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Mỗi khoảng khối lượng sẽ tương ứng với một hàng trong cột thông tin đầu tiên.  Các cột còn lại tương ứng với một giá cước
          tương ứng với khoảng khối lượng đó.*/}
          {weightRanges.map((range, index) => (
            <tr key={index}>
              <td className="border border-blue-700 px-4 py-2">Trên {range}</td>
              {Object.keys(shippingData).map((key) => {
                const pricing = shippingData[key].pricing[index];
                return (
                  <td key={key} className="border border-blue-700 px-4 py-2">{pricing.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                );
              })}
            </tr>
          ))}
          {/* Hàng cuối cùng của bảng cho biết thời gian dự kiến đối với mỗi loại vùng vận chuyển. */}
          <tr className='bg-blue-500 text-white font-bold'>
              <td className="border border-blue-700 px-4 py-2">Chỉ tiêu thời gian</td>
              <td className="border border-blue-700 px-4 py-2">1 ngày</td>
              <td className="border border-blue-700 px-4 py-2">2 ngày</td>
              <td className="border border-blue-700 px-4 py-2">3 ngày</td>
            </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShippingTable;
