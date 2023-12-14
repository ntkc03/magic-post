import React from 'react'
import StaffHeader from '../../components/header/StaffHeader'
import UserSideFooter from '../../components/footer/UserSideFooter'
import OrderDetailsForm from '../../components/order/details/OrderDetailsForm';

interface OrderDetailsPageProps {
  code: string;
}

const OrderDetailsPage: React.FC<OrderDetailsPageProps> = ({ code }) => {
  return (
    <div>
      <StaffHeader/>
      <OrderDetailsForm code={code}/>
      <UserSideFooter/>
    </div>
  )
}

export default OrderDetailsPage
