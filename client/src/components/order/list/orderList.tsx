import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
// import { setToken } from "../../../../features/redux/slices/user/tokenSlice";
// import { useSelector, useDispatch } from "react-redux/es/exports";

import "react-toastify/dist/ReactToastify.css";
import {
    Card,
    CardBody,
  } from "@material-tailwind/react";
import { orderInterface } from "../../../types/OrderInterface";
import OrderBrief from "./orderBrief";

export default function OrderList() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();


  const {
    register,
    formState: { errors },
  } = useForm<orderInterface>({
    // resolver: yupResolver(userLoginValidationSchema),
  });

  const [items, setItems] = useState<React.ReactNode[]>([]);

  const handleAddItem = () => {
    setItems([...items, <OrderBrief key={items.length} />]);
  };
  

  
  
  return (
    <div>
        
    </div>
  );

}