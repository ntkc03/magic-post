import StaffHeader from '../../components/header/StaffHeader'
import UserSideFooter from '../../components/footer/UserSideFooter'
import OrderList from '../../components/order/list/orderList'
const OrderListPage = () => {
  return (
    <div>
      <StaffHeader/>
      <OrderList/>
      <UserSideFooter/>
    </div>
  )
}

export default OrderListPage