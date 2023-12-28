import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../../pages/home/Home'
import ServiceInfoPage from '../../pages/common/ServiceInfoPage'
import CostEstimationPage from '../../pages/common/CostEstimationPage'

function HomeRouter() {
  return (
    <div>
      <Routes>
        <Route path='*' element= {<Home/>} />
        <Route path='/service' element= {<ServiceInfoPage/>} />
        <Route path='/estimation' element= {<CostEstimationPage/>} />
      </Routes>
    </div>
  )
}

export default HomeRouter