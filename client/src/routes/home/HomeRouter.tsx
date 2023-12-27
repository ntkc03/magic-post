import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../../pages/home/Home'
import ServiceInfoPage from '../../pages/common/ServiceInfoPage'

function HomeRouter() {
  return (
    <div>
      <Routes>
        <Route path='*' element= {<Home/>} />
        <Route path='/service' element= {<ServiceInfoPage/>} />
      </Routes>
    </div>
  )
}

export default HomeRouter