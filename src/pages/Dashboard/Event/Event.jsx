import React, { useContext, useEffect, useState } from 'react'
import './Event.css'
import Sidebar from '../../../components/Sidebar/Sidebar'
import Header from '../../../components/Header/Header';
import { toastSuccess, toastError, formatDateDDMON, getEventTimeRange } from '../../../utils';
import { CiEdit } from "react-icons/ci";
import { FiCopy } from "react-icons/fi";
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaExclamationCircle } from "react-icons/fa";
import { useEvent } from '../../../context/EventContext';
import { useNavigate } from 'react-router-dom';

function Events() {

  const { userId, events, loading, GetEventDetails, DeleteEventDetails, toggleEventStatus } = useEvent(useContext);

  const [copiedId, setCopiedId] = useState(null);

  const userData = JSON.parse(localStorage.getItem("user") || "{}");

  const navigate = useNavigate();

  useEffect(()=>{

    if (userId) {
        GetEventDetails();
      }

},[])

  const copyToClipboard = async (eventId, link) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopiedId(eventId); // Track copied card
      setTimeout(() => setCopiedId(null), 2000);
      toastSuccess("Copied Event Meet Link"); // Reset after 2 seconds
    } catch (error) {
      toastError("Failed to copy:");
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className='DashboardContainer'>

      <Sidebar />

      <div className='dashboard-wrapper'>

        <Header />

        <div className='Showmeeting'>

          {/*  */}

          <div className="event-grid">
            {loading ? (
              <p>Loading events...</p>
            ) : (
              events.map(event => (
                <div
                  key={event._id}
                  className="event-card"
                >
                  <div style={{ backgroundColor: event.isActive ? event.backgroundColor : "#676767" }}
                    className={`card-top ${event.isActive ? 'active' : 'inactive'}`}> </div>

                  <div className='eventDetails'>
                    <h3 className='topic'>{event.topic}</h3>
                    <p className='dateMON'>{formatDateDDMON(event.date)}</p>
                    <p style={{ color: event.backgroundColor }}>{getEventTimeRange(event.time, event.ampm, event.duration)}</p>
                    <span className='color7E'>{event.duration} hour, {event.description}</span>

                    <button className='EditIcon ICONS' onClick={() => navigate(`/createEvent/${event._id}`)}>
                      <CiEdit size={20} />
                    </button>

                    {event.hasConflict && (
                      <div className="conflict-warning">
                        <FaExclamationCircle size={16} color="red" />
                        <span className="warning-label">Conflict of timing</span>
                      </div>
                    )}



                  </div>

                  <hr className='cardLine' />
                  <div className="event-icons">
                    <button
                      style={{ color: event.isActive ? event.backgroundColor : "#676767" }}
                      className="ICONS" onClick={() => toggleEventStatus(event._id, event.isActive)}>
                      {event.isActive ? <FaToggleOn size={20} /> : <FaToggleOff size={20} />}
                    </button>

                    <button className='ICONS' onClick={() => copyToClipboard(event._id, event.eventLink)}>
                      <FiCopy size={20} />
                    </button>

                    <button className='ICONS' s onClick={() => DeleteEventDetails(event._id)}>
                      <FaTrash size={20} />
                    </button>

                  </div>

                </div>
              ))
            )}
          </div>

          {/*  */}
        </div>

      </div>

    </div>

  )
}

export default Events;