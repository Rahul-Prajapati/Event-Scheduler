import React from 'react'
import MyCalendar from '../../../components/Calendar/MyCalendar'
import Sidebar from '../../../components/Sidebar/Sidebar'
import Header from '../../../components/Header/Header'

function Availability() {
  return (
    <div className='DashboardContainer'>

      <Sidebar />

      <div className='dashboard-wrapper'>

        <Header />

        <div className='availability-section'>

          

        </div>

          <MyCalendar/>


        
        
        
        </div>
    </div>
  )
}

export default Availability