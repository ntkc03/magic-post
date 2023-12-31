import { Card } from "@material-tailwind/react";
import { costCalcu } from "../order/create/calculation";
import axios from "axios";
import { useEffect, useState } from "react";

//************************************
// Description: Phần thân của trang Ước tính cước phí tại phần chung dành cho người dùng.
//************************************

// Đối tượng City dành cho phần select để lựa chọn thành phố bắt đầu/kết thúc.
interface City {
  Name: string;
  Id: string;
}

function CostEstimation() {
  // Thành phần và hàm thay đổi trạng thái (state) của một thành phần .
  const [senderCity, setSenderCity] = useState<string>("");
  const [receiverCity, setReceiverCity] = useState<string>("");
  const [weight, setWeight] = useState<number>(0);

  // Khởi tạo các option cho selector thành phố của nơi gửi và nơi nhận
  // Bước 1: Lấy dữ liệu json từ đường dẫn và gán chúng vào mảng các đối tượng City
  // Bước 2: Tương ứng với mỗi đối tượng trong City, tạo một option có giá trị là một tỉnh/thành phố.
  useEffect(() => {
    const sender = document.getElementById("senderCity") as HTMLSelectElement;
    const receiver = document.getElementById("receiverCity") as HTMLSelectElement;

    const fetchData = async () => {
      try {
        const response = await axios.get<City[]>("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json");
        const data = response.data;
        if (sender && receiver) {
          for (const x of data) {
            sender.options[sender.options.length] = new Option(x.Name, x.Name);
            receiver.options[receiver.options.length] = new Option(x.Name, x.Name);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Tính toán cước phí và thời gian giao hàng dự kiến khi biết tỉnh/thành phố gửi/nhận và khối lượng của hàng hóa.
  // Bước 1: Từ tỉnh/thành phố gửi/nhận và khối lượng, gọi hàm costCalcu() để tính toán ra fee và time
  // Bước 2: Gán fee và time vào đối tượng hiển thị trên trang.
  useEffect(() => {
    const setTotalValue = async () => {
      const fee = document.getElementById("fee") as HTMLElement;
      const time = document.getElementById("time") as HTMLElement;

      if (senderCity !== "" && receiverCity !== "" && weight !== 0 && !Number.isNaN(weight)) {
        try {
          const { totalFee, estimatedTime } = await costCalcu(senderCity, receiverCity, weight);
          var f = totalFee.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
          fee.innerText = `${f}`;
          time.innerText = `${estimatedTime} ngày`;
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        fee.innerText = `0 VND`;
        time.innerText = `0 ngày`;
      }
    };
    setTotalValue();
  }, [senderCity, receiverCity, weight]);

  // Ba hàm handle...Change dùng để thay đổi trạng thái của thành phần đã khai báo ở trên khi giá trị trong input
  // được thay đổi. 
  const handleSenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSenderCity(event.target.value);
  };

  const handleReceiverChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setReceiverCity(event.target.value);
  };

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(parseInt(event.target.value) || 0);
  };

  // Phần thân của trang Ước tính cước phí.
  return (
    <div className="relative overflow-hidden bg-background py-8 sm:py-12 min-h-screen">
      <div className="items-center justify-center bg-background text-center text-textColor">
        <h1 className="text-4xl sm:text-8xl font-logo">Magic Post</h1>
        <div className="mb-0">
          <img
            src="https://i.imgur.com/Jrvywgo.png"
            alt="Img"
            className="fixed top-16 left-0 w-full h-full object-cover"
          />
        </div>
        <div className="mx-[5%] md:mx-[20%] mt-4">
          <Card className="text-left bg-white p-8 space-y-4">
            <h1 className="text-center lg:text-[25px] mr-[1%] text-[20px] uppercase">Ước tính cước phí</h1>
            <div className="md:mx-[10%]">
              <div>
                <h1 className="font-bold text-lg">Gửi từ</h1>
                <div className="my-2">
                  <select
                    id="senderCity"
                    className="w-full px-2 py-3 border border-gray-300  rounded focus:outline-none focus:border-blue-500 form-select form-select-sm mb-3"
                    aria-label=".form-select-sm"
                    onChange={handleSenderChange}
                    value={senderCity}
                  >
                    <option value="" hidden>Tỉnh/Thành phố</option>
                  </select>
                </div>
              </div>
              <div>
                <h1 className="font-bold text-lg">Gửi đến</h1>
                <div className="my-2">
                  <select
                    id="receiverCity"
                    className="w-full px-2 py-3 border border-gray-300  rounded focus:outline-none focus:border-blue-500 form-select form-select-sm mb-3"
                    aria-label=".form-select-sm"
                    onChange={handleReceiverChange}
                    value={receiverCity}
                  >
                    <option value="" hidden>Tỉnh/Thành phố</option>
                  </select>
                </div>
              </div>

              <div>
                <h1 className="font-bold text-lg">Trọng lượng</h1>
                <div className="my-2">
                  <input
                    type="text"
                    placeholder="Nhập tổng khối lượng"
                    id="total-weight"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    onChange={handleWeightChange}
                    value={weight}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 mt-8 text-lg border-t-4 border-blue-700 pt-4 font-bold text-blue-700">
                <p>Tổng cước</p>
                <p id="fee" className="text-right">0 VND</p>
              </div>

              <div className="grid grid-cols-2 mt-4 text-lg font-bold text-blue-700">
                <p>Thời gian ước tính</p>
                <p id="time" className="text-right">0 ngày</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CostEstimation;
