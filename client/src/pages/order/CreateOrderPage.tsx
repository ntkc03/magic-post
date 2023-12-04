import React from 'react'
import CreateOrder from '../../components/order/createOrder'
import StaffHeader from '../../components/header/StaffHeader'
import UserSideFooter from '../../components/footer/UserSideFooter'
const CreateOrderPage = () => {
  return (
    <div>
      <StaffHeader/>
      <CreateOrder/>
      <div className='md:hidden'>
        <UserSideFooter/>
      </div>
    </div>
  )
}

export default CreateOrderPage
