import React, { useState } from 'react'
import MyCalendar from '../../../components/Calendar/MyCalendar'
import Sidebar from '../../../components/Sidebar/Sidebar'
import Header from '../../../components/Header/Header'
import AvailabilityForm from '../../../components/AvailabilityComp/AvailabilityForm'
import { FaCalendarAlt, FaList } from 'react-icons/fa'
import "./Availability.css"

function Availability() {

  const [activeTab, setActiveTab] = useState("availability");

  return (
    <div className='DashboardContainer'>

      <Sidebar />

      <div className='dashboard-wrapper'>

        <Header />

        <div className='availability-section'>
          <div className="tabs-container-aval">
            <div className="tabs-aval">
              <button
                className={`tab-aval ${activeTab === "availability" ? "active" : ""}`}
                onClick={() => setActiveTab("availability")}
              >
                <FaList />
                <span>Availability</span>
              </button>
              <button
                className={`tab-aval ${activeTab === "calendar" ? "active" : ""}`}
                onClick={() => setActiveTab("calendar")}
              >
                <FaCalendarAlt />
                <span>Calendar View</span>
              </button>
            </div>

            {/* <div className="tab-content">
              {activeTab === "availability" && <p>Showing Availability content...</p>}
              {activeTab === "calendar" && <p>Showing Calendar View content...</p>}
            </div> */}
          </div>





        </div>

        {activeTab === "availability" &&  <AvailabilityForm /> }
        {activeTab === "calendar" && <MyCalendar /> }

        {/* <MyCalendar />

        <AvailabilityForm /> */}





      </div>
    </div>
  )
}

export default Availability