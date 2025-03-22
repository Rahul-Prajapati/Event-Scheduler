import React, { useState } from 'react'
import './Event.css'
import Sidebar from '../../../components/Sidebar/Sidebar'
import CreateEvent from '../CreateEvent/CreateEvent';

function Events() {
  const [activeItem, setActiveItem] = useState("Events");
  return (
    <div className='EventContainer'>

      <Sidebar />

      <div>
        Events
      </div>

    </div>

  )
}

export default Events;