import UserSideFooter from "../../components/footer/UserSideFooter"
import StaffHeader from "../../components/header/StaffHeader"
import OrderShippingStatistic from "../../components/order/statistic/OrderShippingStatistic"

const OrderShippingStatisticPage= () => {
    return (
      <div>
        <StaffHeader/>
        <OrderShippingStatistic/>
        <UserSideFooter/>
      </div>
    )
  }
  
  export default OrderShippingStatisticPage