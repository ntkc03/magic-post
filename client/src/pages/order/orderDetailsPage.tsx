import React from 'react'
import StaffHeader from '../../components/header/StaffHeader'
import UserSideFooter from '../../components/footer/UserSideFooter'
import OrderDetails from '../../components/order/details/orderDetails';

interface OrderDetailsPageProps {
  code: string;
}

const OrderDetailsPage: React.FC<OrderDetailsPageProps> = ({ code }) => {
  return (
    <div>
      <StaffHeader/>
      <OrderDetails code={code} />
      <UserSideFooter/>
    </div>
  )
}

export default OrderDetailsPage
