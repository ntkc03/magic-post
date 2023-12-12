import { Route, Routes, useParams } from "react-router-dom";
import CreateOrderPage from "../../pages/order/CreateOrderPage";
import OrderDetailsPage from "../../pages/order/orderDetailsPage";

function OrderDetailsPageWrapper() {
  const { code } = useParams();
  const codeValue = code || '';
  return <OrderDetailsPage code={codeValue} />;
}

const OrderRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/new" element={<CreateOrderPage />} />
        <Route path="/details/:code" element={<OrderDetailsPageWrapper/>} />
      </Routes>
    </div>
  );
};

export default OrderRouter;
