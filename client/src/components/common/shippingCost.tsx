import React, { useState, useEffect } from 'react';

interface ShippingType {
  type: string;
  pricing: number[];
  estimateTime: number;
}

interface ShippingData {
  [key: string]: ShippingType;
}

const apiUrl = 'https://api.npoint.io/78054097cc581e7db9eb';

const ShippingTable: React.FC = () => {
  const [shippingData, setShippingData] = useState<ShippingData>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch the data. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setShippingData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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

  return (
    <div className="overflow-x-auto text-center">
      <table className="min-w-full border-collapse border border-blue-700">
        <thead className="bg-blue-500">
          <tr>
            <th className="border border-blue-700 px-4 py-2 text-white">Trọng lượng</th>
            {Object.keys(shippingData).map((key) => (
              <th key={key} className="border border-blue-700 text-white px-4 py-2">{shippingData[key].type}</th>
            ))}
          </tr>
        </thead>
        <tbody>
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
