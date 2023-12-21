import React from 'react'
import CommonHeader from '../../components/header/CommonHeader'
import SearchBox from '../../components/order/search/searchBox'
import UserSideFooter from '../../components/footer/UserSideFooter'

function SearchPage() {
  return (
    <div>
        <CommonHeader/>
        <SearchBox/>
        <UserSideFooter/>
    </div>
  )
}

export default SearchPage;