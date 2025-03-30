import React, { useContext, useState } from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar'
import Header from '../../../components/Header/Header'
import { useBookEvent } from '../../../context/BookEventContext'
import BookCard from '../../../components/BookCard/BookCard'
import "./Booking.css"
import ParticipantModal from '../../../components/Modal/ParticipantModal'

function Booking() {

  const { allEvents, filteredEvents } = useBookEvent(useContext);
  const [selectedEvent, setSelectedEvent] = useState(null);

  console.log(allEvents);

  console.log(filteredEvents);

  const [activeTab, setActiveTab] = useState("Pending");
  const tabs = ["Upcoming", "Pending", "Cancelled", "Past"];


  return (

    <div className='DashboardContainer'>

      <Sidebar />

      <div className='dashboard-wrapper'>

        <Header />

        <div className='booking-container'>
          <div className="tabs-container">
            {/* Tab Buttons */}
            <div className="tabs">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`tab-button ${activeTab === tab ? "activeStatus" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="tab-content">

              {filteredEvents[activeTab]?.length > 0 ? (
                filteredEvents[activeTab].map((event) => (
                  <BookCard key={event._id} event={event} setSelectedEvent={setSelectedEvent} />
                ))
              ) : (
                <p>No events found.</p>
              )}

            </div>

          </div>

          {selectedEvent && <ParticipantModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}

        </div>

      </div>

    </div>
  )
}

export default Booking