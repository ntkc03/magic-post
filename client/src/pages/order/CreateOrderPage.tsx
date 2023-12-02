import React from 'react'
import CreateOrder from '../../components/order/createOrder'
import CommonHeader from '../../components/header/CommonHeader'
import UserSideFooter from '../../components/footer/UserSideFooter'
const CreateOrderPage = () => {
  return (
    <div>
      <CommonHeader/>
      <CreateOrder/>
      <UserSideFooter/>
    </div>
  )
}

export default CreateOrderPage
