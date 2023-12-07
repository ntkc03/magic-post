import React from 'react'
import OrderDetails from '../../components/order/orderDetails'
import StaffHeader from '../../components/header/StaffHeader'
import UserSideFooter from '../../components/footer/UserSideFooter'
const OrderDetailsPage = () => {
  return (
    <div>
      <StaffHeader/>
      <OrderDetails/>
      <UserSideFooter/>
    </div>
  )
}

export default OrderDetailsPage
