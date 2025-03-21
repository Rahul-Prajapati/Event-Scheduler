import React, { useState } from 'react'
import './Dashboard.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import Events from '../../components/Events/Events'

function Dashboard() {
  const [activeItem, setActiveItem] = useState("Events");
  return (
    <div className='dashboardContainer'>

      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />

      { activeItem == "Events" && (  <Events/> )}

    </div>

  )
}

export default Dashboard