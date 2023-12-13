import React from 'react'
import CommonHeader from '../../components/header/CommonHeader'
import OrderStatus from '../../components/order/search/orderStatus'
import UserSideFooter from '../../components/footer/UserSideFooter'

function SearchPage() {
  return (
    <div>
        <CommonHeader/>
        <OrderStatus/>
        <UserSideFooter/>
    </div>
  )
}

export default SearchPage;