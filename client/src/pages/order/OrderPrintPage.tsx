import React from 'react'
import StaffHeader from '../../components/header/StaffHeader'
import UserSideFooter from '../../components/footer/UserSideFooter'
import OrderPrintForm from '../../components/order/details/print/OrderPrintForm'

interface OrderPrintFormPageProps {
  code: string;
}

const OrderPrintFormPage: React.FC<OrderPrintFormPageProps> = ({ code }) => {
  return (
    <div>
      <StaffHeader/>
      <OrderPrintForm code={code}/>
      <UserSideFooter/>
    </div>
  )
}

export default OrderPrintFormPage
