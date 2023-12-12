import React from 'react'
import OrderDetails from '../../components/order/details/orderDetails'
import StaffHeader from '../../components/header/StaffHeader'
import UserSideFooter from '../../components/footer/UserSideFooter'
import HomePage from '../../components/homepage/HomePage'
const EmployerHomePage = () => {
  return (
    <div>
      <StaffHeader/>
      <HomePage/>
      <UserSideFooter/>
    </div>
  )
}

export default EmployerHomePage