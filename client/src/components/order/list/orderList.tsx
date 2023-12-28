import { useEffect, useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import { getOrderList } from '../../../features/axios/api/order/createOrder';
import OrderTable from "./orderTable";
import SearchFilterBar from "./filter/searchFilterBar";
import React from "react";
import { orderInterface } from "../../../types/OrderInterface";
import { formatDate } from "../details/format";
import { useDispatch } from "react-redux";
import { employerData } from "../../../features/axios/api/employer/userDetails";
import { fetchUser, clearUserDetails } from "../../../features/redux/slices/user/userDetailsSlice";
import { employerInterface } from "../../../types/EmployerInterface";

//************************************
// Description: Phần thân của trang hiển thị danh sách đơn.
//************************************

const token = localStorage.getItem("token");
export default function OrderList() {
  const dispatch = useDispatch();
  const [employerDetails, setEmployerDetails] = useState<employerInterface>();

  // Lấy dữ liệu nhân viên
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

  // Lấy dữ liệu của đơn hàng theo từng địa chỉ của điểm tập kết/giao dịch
  // Có filter theo tháng-năm đã chọn
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

            setAllOrders(filterOrders);
            setFilteredOrders(filterOrders);

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
            console.log(filterOrders)
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


  // Filter dữ liệu theo bộ tìm kiếm và bộ lọc theo trạng thái của đơn hàng.
  const [filteredOrders, setFilteredOrders] = useState([...allOrders]);

  const handleSearch = (query: string) => {
    if(query === '') {
      setFilteredOrders(allOrders);
      return;
    }
    const lowercaseQuery = query.toLowerCase();
    // Filter orders based on the search query
    const filtered = allOrders.filter(
      (order) =>
        order.code?.toLowerCase().includes(lowercaseQuery) ||
        order.senderName?.toLowerCase().includes(lowercaseQuery) ||
        order.receiverName?.toLowerCase().includes(lowercaseQuery) ||
        order.items?.join(', ').toLowerCase().includes(lowercaseQuery) ||
        formatDate(order?.create_at ?? new Date()).toLowerCase().includes(lowercaseQuery)
    );
    setFilteredOrders(filtered);
  };

  const handleFilter = (filter: string) => {
    if(filter === '') {
      setFilteredOrders(allOrders);
      return;
    }
    console.log(filter)
    const filtered = allOrders.filter(
      (order) =>
        order.status?.[order.status.length - 1]?.action?.toLowerCase() === filter.toLowerCase()
    );
    setFilteredOrders(filtered);
  };
  
  
  return (
    <div className="min-h-screen bg-background py-8" id="container">
      <div className="mx-[5%] order-1 md:order-2">
      <div className="mr-[1%] mb-8">
          <p className="md:text-[30px] text-[20px] flex justify-center mb-4">Danh sách đơn hàng</p>
          {employerDetails?.role === "Nhân viên điểm giao dịch" && (
            <p className="flex justify-center">Điểm giao dịch: {employerDetails.transaction}</p>
          )}
          {employerDetails?.role === "Nhân viên điểm tập kết" && (
            <p className="flex justify-center">Điểm tập kết: {employerDetails.consolidation}</p>
          )}
        </div>
        
        {/* Search Bar and Filter */}
        <div className="lg:mx-[15%] mt-8">
          <SearchFilterBar onSearch={handleSearch} onFilter={handleFilter} employerRole={employerDetails?.role || ""}/>
        </div>
        <div className="flex justify-end my-8">
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
        {/* List of items */}
        <div className="mt-8">
          <OrderTable allOrders={filteredOrders} employer={employerDetails}/>
        </div>
      </div>
    </div>
  );

}