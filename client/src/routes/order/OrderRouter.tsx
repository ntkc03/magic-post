import { Route, Routes } from "react-router-dom";
import CreateOrderPage from "../../pages/order/CreateOrderPage";
import OrderDetailsPage from "../../pages/order/orderDetailsPage";

const OrderRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/new" element={<CreateOrderPage />} />
        <Route path="/register" element={<OrderDetailsPage />} />
      </Routes>
    </div>
  );
};

export default OrderRouter;
