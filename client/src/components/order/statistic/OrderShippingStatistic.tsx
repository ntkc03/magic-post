import { useEffect, useState } from "react";
import PieChart from "./PieChart";
import { Card } from "@material-tailwind/react";
import React from "react";
import { useDispatch } from "react-redux";
import { employerData } from "../../../features/axios/api/employer/userDetails";
import { getOrderList } from "../../../features/axios/api/order/createOrder";
import { fetchUser, clearUserDetails } from "../../../features/redux/slices/user/userDetailsSlice";
import { employerInterface } from "../../../types/EmployerInterface";
import { orderInterface } from "../../../types/OrderInterface";
import BarChart from "./BarChart";

const token = localStorage.getItem("token");

export default function OrderShippingStatistic() {
  const dispatch = useDispatch();
  const [employerDetails, setEmployerDetails] = useState<employerInterface>();

  useEffect(() => {
    if (token) {
      dispatch(fetchUser());
      const employerDetails = async () => {
        const data = await employerData();
        setEmployerDetails(data);
      };
      employerDetails();
    }
    return () => {
      dispatch(clearUserDetails());
    };
  }, [dispatch]);

  const [allOrders, setAllOrders] = React.useState<orderInterface[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  React.useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrderList();
        if (response) {
          const { status, allOrders: fetchedOrders } = response;
  
          if (status === 'success') {
            let orders: orderInterface[] = fetchedOrders;
            let filterOrders: orderInterface[] = [];
            for (let i = 0; i < orders.length; i++) {
              if (orders[i]?.status) {
                let statuses = orders[i].status;
                if (statuses && statuses.length > 0) {
                  let status = statuses[statuses.length - 1];
                  console.log(employerDetails?.consolidation)
                  if((employerDetails?.consolidation === status.fromConsolidation && employerDetails?.transaction === status.fromTransaction) 
                  || (employerDetails?.consolidation === status.toConsolidation && employerDetails?.transaction === status.toTransaction)) {
                    filterOrders.push(orders[i]);
                  }
                }
              }
            }

            if (selectedMonth && selectedYear) {
              filterOrders = filterOrders.filter((order) => {
                let orderDate = new Date();
                if (order.create_at) {
                  orderDate = new Date(order.create_at);
                }
                const orderMonth = orderDate.getMonth() + 1;
                const orderYear = orderDate.getFullYear();
                console.log(orderMonth.toString().padStart(2, "0"), orderYear.toString())
                return (
                  orderMonth.toString().padStart(2, "0") === selectedMonth &&
                  orderYear.toString() === selectedYear
                );
              });
            }

            setAllOrders(filterOrders);
            setFilteredOrders(filterOrders);
          } else {
            console.error('Error: Unexpected response status');
          }
        } else {
          console.error('Error: Response data is undefined');
        }
      } catch (error: any) {
        console.error('Error fetching orders:', error.message);
      }
    };
  
    fetchOrders();
  }, [employerDetails, selectedMonth, selectedYear]);

  const [filteredOrders, setFilteredOrders] = useState([...allOrders]);

  const [successes, setSuccesses] = useState<number>(0);
  const [failures, setFailures] = useState<number>(0);
  const [send, setSend] = useState<number>(0);
  const [receive, setReceive] = useState<number>(0);
  React.useEffect(() => {
    const calculate = async () => {
      let success = 0;
      let failure = 0;
      let send = 0;
      let receiver = 0;
      for (let i = 0; i < filteredOrders.length; i++) {
        if (filteredOrders[i]?.status) {
          let statuses = filteredOrders[i].status;
          if (statuses && statuses.length > 0) {
            let status = statuses[statuses.length - 1];
            if (status.action === "Giao hàng thành công") {
              success += 1;
            } else if (status.action === "Giao hàng không thành công") {
              failure += 1;
            } 

            if (employerDetails?.role === "Nhân viên điểm tập kết") {
              if (status.action === "Đang gửi đến điểm tập kết") {
                receiver += 1;
              }
              if (status.action === "Đang gửi đến điểm tập kết đích") {
                if (employerDetails.consolidation === status.fromConsolidation) {
                  send += 1;
                } else if (employerDetails.consolidation === status.toConsolidation) {
                  receiver += 1;
                }
              } 
              if (status.action === "Đang gửi đến điểm giao dịch đích") {
                send += 1;
              } 
            } else if (employerDetails?.role === "Nhân viên điểm giao dịch") {
              if (status.action === "Đang gửi đến điểm tập kết") {
                send += 1;
              }
              if (status.action === "Đang gửi đến điểm giao dịch đích") {
                receiver += 1;
              }

            }
          }
        }
      }
      console.log(receiver, send);
      setSuccesses(success);
      setFailures(failure);
      setSend(send);
      setReceive(receiver);
    }
    calculate();
  }, [filteredOrders, allOrders]);

  const [statusCount, setStatusCount] = useState<Map<string, number>>();
  React.useEffect(() => {
    const calculate = async () => {
      let status_count: Map<string, number> = new Map<string, number>;
      if (employerDetails?.role === "Nhân viên điểm giao dịch") {
        status_count.set("Nhận đơn hàng", 0);
        status_count.set("Đang gửi đến điểm tập kết", 0);
        status_count.set("Đang gửi đến điểm giao dịch đích", 0);
        status_count.set("Điểm giao dịch đích đã nhận", 0);
        status_count.set("Đang giao hàng", 0);
        status_count.set("Giao hàng thành công", 0);
        status_count.set("Giao hàng không thành công", 0);
      } else {
        status_count.set("Đang gửi đến điểm tập kết", 0);
        status_count.set("Điểm tập kết đã nhận", 0);
        status_count.set("Đang gửi đến điểm tập kết đích", 0);
        status_count.set("Điểm tập kết đích đã nhận", 0);
        status_count.set("Đang gửi đến điểm giao dịch đích", 0);
      }
      for (let i = 0; i < filteredOrders.length; i++) {
        if (filteredOrders[i]?.status) {
          let statuses = filteredOrders[i].status;
          if (statuses && statuses.length > 0) {
            let status = statuses[statuses.length - 1]?.action;
            if (status) {
              if (status_count.has(status)) {
                status_count.set(status, status_count.get(status)! + 1);
              } else {
                status_count.set(status, 1);
              } 
            }
          }
        }
      }
      setStatusCount(status_count);
    }
    calculate();
  }, [filteredOrders, allOrders]);

  const renderStatusCountTable = () => {
    if (!statusCount) return null;

    return (
      <table className="table-auto mt-4 border-collapse w-full">
      <thead>
        <tr>
          <th className="border px-4 py-2 bg-gray-100">Trạng thái</th>
          <th className="border px-4 py-2 bg-gray-100">Số đơn</th>
        </tr>
      </thead>
      <tbody>
        {Array.from(statusCount).map(([status, count]) => (
          <tr key={status}>
            <td className="border px-4 py-2 text-left">{status}</td>
            <td className="border px-4 py-2 text-right">{count}</td>
          </tr>
        ))}
      </tbody>
    </table>
    );
  };

  return (
    <div className="min-h-screen bg-background py-8" id="container">
      <div className="mx-[5%] order-1 md:order-2">
        <div className="mr-[1%] mb-8">
          <p className="md:text-[30px] text-[20px] flex justify-center mb-4">Thống kê đơn hàng</p>
          {employerDetails?.role === "Nhân viên điểm giao dịch" && (
            <p className="flex justify-center">Điểm giao dịch: {employerDetails.transaction}</p>
          )}
          {employerDetails?.role === "Nhân viên điểm tập kết" && (
            <p className="flex justify-center">Điểm tập kết: {employerDetails.consolidation}</p>
          )}
        </div>
        <div className="flex justify-end mb-8">
          <select
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value);
            }}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-green-500"
          >
            <option value="" hidden>Chọn tháng</option>
            <option value="01">Tháng 1</option>
            <option value="02">Tháng 2</option>
            <option value="03">Tháng 3</option>
            <option value="04">Tháng 4</option>
            <option value="05">Tháng 5</option>
            <option value="06">Tháng 6</option>
            <option value="07">Tháng 7</option>
            <option value="08">Tháng 8</option>
            <option value="09">Tháng 9</option>
            <option value="10">Tháng 10</option>
            <option value="11">Tháng 11</option>
            <option value="12">Tháng 12</option>
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-green-500 ml-2"
          >
            <option value="" hidden>
              Chọn năm
            </option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>
        <div className="lg:grid lg:grid-cols-2 lg:space-x-8">
          <div className="mb-8 lg:mb-0">
            {employerDetails?.role === "Nhân viên điểm giao dịch" && (
              <div className="mb-8">
                <Card className="bg-white p-8">
                  <h1 className="md:text-[20px] mr-[1%] text-[15px]">Tỉ lệ giao thành công/thất bại</h1>
                  <div className="flex justify-center">
                    <PieChart successes={successes} failures={failures} width='350px' height='auto'/>
                  </div>
                </Card>
              </div>
            )}
            
            <div>
              <Card className="bg-white p-8">
                <h1 className="md:text-[20px] mr-[1%] text-[15px]">Lượt hàng đang đi/về</h1>
                <div className="flex justify-center pt-8">
                  <BarChart send={send} receive={receive} width='350px' height='auto'/>
                </div>
              </Card>
            </div>
            
          </div>
          
          <div>
            <Card className="bg-white p-8">
              <h1 className="md:text-[20px] mr-[1%] text-[15px]">Danh sách tình trạng</h1>
              {renderStatusCountTable()}
            </Card>
          </div>
          
        </div>
        
      </div>
    </div>
  );

}