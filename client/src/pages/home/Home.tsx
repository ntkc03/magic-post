import React from 'react'
import CommonHeader from '../../components/header/CommonHeader'
import HomePage from '../../components/homepage/HomePage'
import UserSideFooter from '../../components/footer/UserSideFooter'

function Home() {
  return (
    <div>
        <CommonHeader/>
        <HomePage/>
        <UserSideFooter/>
    </div>
  )
}

export default Home;