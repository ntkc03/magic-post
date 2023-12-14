import { Route, Routes, useParams } from "react-router-dom";
import CreateOrderPage from "../../pages/order/CreateOrderPage";
import OrderDetailsPage from "../../pages/order/orderDetailsPage";
import OrderPrintFormPage from "../../pages/order/OrderPrintPage";
import OrderListPage from "../../pages/order/orderListPage";

function OrderDetailsPageWrapper() {
  const { code } = useParams();
  const codeValue = code || '';
  return <OrderDetailsPage code={codeValue} />;
}

function OrderPrintFormPageWrapper() {
  const { code } = useParams();
  const codeValue = code || '';
  return <OrderPrintFormPage code={codeValue} />;
}

const OrderRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/new" element={<CreateOrderPage />} />
        <Route path="/details/:code" element={<OrderDetailsPageWrapper/>} />
        <Route path="/print/:code" element={<OrderPrintFormPageWrapper/>} />
        <Route path="/list" element={<OrderListPage/>} />
      </Routes>
    </div>
  );
};

export default OrderRouter;
