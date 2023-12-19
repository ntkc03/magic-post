import { useEffect, useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import { getOrderList } from '../../../features/axios/api/order/createOrder';
import OrderTable from "./orderTable";
import SearchFilterBar from "./filter/searchFilterBar";
import React from "react";
import { orderInterface } from "../../../types/OrderInterface";
import { formatDate } from "../details/format";

export default function OrderList() {

  const [allOrders, setAllOrders] = React.useState<orderInterface[]>([]);

  React.useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrderList();
        if (response) {
          const { status, allOrders: fetchedOrders } = response;
  
          if (status === 'success') {
            setAllOrders(fetchedOrders);
            setFilteredOrders(fetchedOrders);
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
  }, []);

  useEffect(() => {
    function setPadding(){
      let header: HTMLElement | null  = document.getElementById('fixed-header');
      let container: HTMLElement | null  = document.getElementById('container');

      if(container) {
        container.style.marginTop = header?.offsetHeight + "px";
      }
    }
    setPadding();
    window.addEventListener('resize', setPadding);
  });

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
          <SearchFilterBar onSearch={handleSearch} onFilter={handleFilter}/>
        </div>

        {/* List of items */}
        <div className="mt-8">
          <OrderTable allOrders={filteredOrders}/>
        </div>
      </div>
    </div>
  );

}