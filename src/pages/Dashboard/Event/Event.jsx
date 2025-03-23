import React, { useState } from 'react'
import './Event.css'
import Sidebar from '../../../components/Sidebar/Sidebar'
import CreateEvent from '../CreateEvent/CreateEvent';
import Header from '../../../components/Header/Header';

function Events() {
  return (
    <div className='DashboardContainer'>

      <Sidebar />

      <div className='dashboard-wrapper'>

        <Header />

        <div className='Showmeeting'>

          

        </div>

      </div>

    </div>

  )
}

export default Events;