import { Route, Routes, useParams } from "react-router-dom";
import CreateOrderPage from "../../pages/order/CreateOrderPage";
import OrderDetailsPage from "../../pages/order/orderDetailsPage";
import SearchPage from "../../pages/order/searchPage";

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
        <Route path="/search" element={<SearchPage/>} />
      </Routes>
    </div>
  );
};

export default OrderRouter;
