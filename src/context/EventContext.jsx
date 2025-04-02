import React, { createContext, useState, useEffect, useContext } from "react";
import { toastSuccess, toastError } from '../utils';
import { useNavigate } from "react-router-dom";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {

    const [userData, setUserData] = useState(() => {
        return JSON.parse(localStorage.getItem("user") || "{}");
      });
   
    const [ userId, SetuserId]  = useState(userData?._id);

    console.log(userId);

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect(()=>{

    //     if (userId) {
    //         GetEventDetails();
    //       }
    
    // },[])

    const CreateNewEvent = async(payload, navigate) =>{
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/event/createEvent`, {
              method: "POST",
              headers:
              {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("token")}`
              },
              body: JSON.stringify(payload),
            });
      
            if (!response.ok) {
                const errorData = await response.json(); // Parse the error response from backend  
                toastError(errorData.message);              
            }
      
            const data = await response.json();
            GetEventDetails();
            toastSuccess(data.message);
            navigate("/events");
          } catch (error) {
            toastError(error);
            console.log("Error:", error);
          }
            
    }
    const getEventStartTime = (event) => {
        if (!event?.date || !event?.time || !event?.ampm) return null; // Validate input
    
        let [hours, minutes] = event.time.split(":").map(Number);
    
        // Convert to 24-hour format using ampm field
        if (event.ampm === "PM" && hours < 12) {
            hours += 12; // Convert PM hours to 24-hour format
        } else if (event.ampm === "AM" && hours === 12) {
            hours = 0; // Midnight correction
        }
    
        const eventDate = new Date(event.date);
        eventDate.setHours(hours, minutes, 0, 0); // Set correct hours and minutes
    
        return eventDate;
    };
    
    const isTimeOverlapping = (event1, event2) => {
        try {
            console.log("Checking time overlap...");
    
            const startTime1 = getEventStartTime(event1);
            const startTime2 = getEventStartTime(event2);
    
            if (!startTime1 || !startTime2) return false; // Ensure valid times
    
            // Convert duration from hours to milliseconds
            const endTime1 = new Date(startTime1.getTime() + event1.duration * 60 * 60 * 1000);
            const endTime2 = new Date(startTime2.getTime() + event2.duration * 60 * 60 * 1000);
    
            console.log(`Event 1: ${startTime1} - ${endTime1}`);
            console.log(`Event 2: ${startTime2} - ${endTime2}`);
    
            return startTime1 < endTime2 && startTime2 < endTime1;
        } catch (error) {
            console.error("Error in isTimeOverlapping:", error);
            return false; // Default to no conflict if an error occurs
        }
    };
    
 
    const GetEventDetails = async () =>{
    
        if (!userId) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/event/host/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("token")}`
                }
            });
            
            const { EventsDetails, acceptedEventDetails } = await response.json();
            console.log(EventsDetails);
            console.log(acceptedEventDetails);

            const updatedEvents = EventsDetails.map(event => ({
                ...event,
                hasConflict: Array.isArray(acceptedEventDetails) && acceptedEventDetails.some(acceptedEvent =>
                    isTimeOverlapping(event, acceptedEvent)
                )
            }));

            console.log(updatedEvents);

    
            setEvents(updatedEvents); // Update UI state
    
          } catch (error) {
            toastError(error|| "Something went wrong");
          } finally {
            // if(events.length > 0)
                    setLoading(false);
          }

    }


    const UpdateEventDetails = async (eventId, details, navigate) => {

        console.log(details);

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/event/${eventId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("token")}`
                },
                body: JSON.stringify(details),
            });

            if (!response.ok) {
                throw new Error("Failed to submit form data");
            }

            const data = await response.json();
            toastSuccess(data.message);
            console.log("Success:", data);
            navigate("/events")
        } catch (error) {
            toastError(error);

        }

    }

    const DeleteEventDetails = async (eventId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/event/deleteEvent/${eventId}`, {
                method: "DELETE",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("token")}` 
                }
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || "Failed to delete event");
            }
    
            toastSuccess("Event deleted successfully");
            
            // Update UI by removing the deleted event from the events list
            setEvents(prevEvents => prevEvents.filter(event => event._id !== eventId));
    
        } catch (error) {
            console.error("Error deleting event:", error);
            toastError(error);
        }
    };

    // Function to change event status (boolean toggle)
    const toggleEventStatus = async (eventId, currentStatus) => {

        console.log(eventId, currentStatus)
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/event/update-status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    eventId: eventId,  
                    isActive: currentStatus
                })
            });


            if (!response.ok) throw new Error("Failed to toggle event status");

            const data = await response.json();
            console.log(data);
            toastSuccess(data.message);
            setEvents(prevEvents => prevEvents.map(event => event._id === eventId ? { ...event, isActive: data.isActive} : event));
        } catch (error) {
            toastError(updatedEvent.message);
            console.error("Error toggling event status:", error);
        }
    };


    return (
        <EventContext.Provider value={{ userId, events, loading, CreateNewEvent, GetEventDetails, UpdateEventDetails, DeleteEventDetails, toggleEventStatus }}>
            {children}
        </EventContext.Provider>
    );

}

export const useEvent = () => useContext(EventContext);