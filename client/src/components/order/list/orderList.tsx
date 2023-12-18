import { useEffect, useState } from "react";

import "react-toastify/dist/ReactToastify.css";

import OrderTable from "./orderTable";

export default function OrderList() {


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
  
  return (
    <div className="min-h-screen bg-background py-8" id="container">
      <div className="mx-[5%] order-1 md:order-2">
        <h1 className="md:text-[30px] mr-[1%] text-[20px] flex justify-center">Danh sách đơn đi</h1>
        {/* Search Bar and Filter */}
        <div>

        </div>

        {/* List of items */}
        <div className="mt-8">
          <OrderTable />
        </div>
      </div>
    </div>
  );

}