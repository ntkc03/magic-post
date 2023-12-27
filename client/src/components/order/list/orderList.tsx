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

const token = localStorage.getItem("token");

export default function OrderList() {

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
  }, [employerDetails]);

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
        <h1 className="md:text-[30px] mr-[1%] text-[20px] flex justify-center">Danh sách đơn hàng</h1>
        {/* Search Bar and Filter */}
        <div className="lg:mx-[15%] mt-8">
          <SearchFilterBar onSearch={handleSearch} onFilter={handleFilter} employerRole={employerDetails?.role || ""}/>
        </div>

        {/* List of items */}
        <div className="mt-8">
          <OrderTable allOrders={filteredOrders} employer={employerDetails}/>
        </div>
      </div>
    </div>
  );

}