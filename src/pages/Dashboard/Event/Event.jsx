import React, { useEffect, useState } from 'react'
import './Event.css'
import Sidebar from '../../../components/Sidebar/Sidebar'
import Header from '../../../components/Header/Header';
import { toastSuccess, toastError } from '../../../utils';
import { CiEdit } from "react-icons/ci";
import { FiCopy } from "react-icons/fi";
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";

function Events() {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const userData = JSON.parse(localStorage.getItem("user") || "{}");

  const userId = userData._id;

  const formatDateDDMON = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short" });
  };

  useEffect(() => {
    if (!userId) return;
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/event/user/${userId}`);
        const data = await response.json();
        console.log(data)
        setEvents(data);
      } catch (error) {
        toastError(error);
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [userId]);

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
                    <p style={{color: event.backgroundColor}}>{event.time} {event.ampm}</p>
                    <span className='color7E'>{event.duration} hour, {event.description}</span>

                    <button className='EditIcon ICONS' onClick={() => console.log("Edit Event", event._id)}>
                        <CiEdit size={20} />
                      </button>
                  </div>

                  <hr className='cardLine' />
                    <div className="event-icons">
                      <button  
                      style={{ color: event.isActive ? event.backgroundColor : "#676767" }}
                      className="ICONS" onClick={() => toggleEventStatus(event._id)}>
                        {event.isActive ? <FaToggleOn size={20} /> : <FaToggleOff size={20} />}
                      </button>

                      <button className='ICONS' onClick={() => console.log("Copy Event", event._id)}>
                        <FiCopy size={20} />
                      </button>

                      <button className='ICONS's onClick={() => deleteEvent(event._id)}>
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