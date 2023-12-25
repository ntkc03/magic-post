import React from 'react'
import StaffHeader from '../../components/header/StaffHeader'
import UserSideFooter from '../../components/footer/UserSideFooter'
import EmployerHome from '../../components/homepage/EmployerHomePage'
const EmployerHomePage = () => {
  return (
    <div>
      <StaffHeader/>
      <EmployerHome/>
      <UserSideFooter/>
    </div>
  )
}

export default EmployerHomePage