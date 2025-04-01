import React, { createContext, useState, useEffect, useContext } from "react";
import { toastSuccess, toastError } from '../utils';
import { useNavigate } from "react-router-dom";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {

    // const navigate = useNavigate();
   

    const userData = JSON.parse(localStorage.getItem("user") || "{}");

    const  userId  = userData._id;

    console.log(userId);

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{

        GetEventDetails();
    
    },[userId])

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
            toastSuccess(data.message);
            navigate("/events");
          } catch (error) {
            // toastError(data.message);
            console.log("Error:", error);
          }
            
    }

    // const isTimeOverlapping = (event1, event2) => {
    //     console.log("Timeoverlapping");
    //     const start1 = formatDate(event1.date, event1.time, event1.ampm);
    //     const end1 = new Date(start1.getTime() + event1.duration * 60 * 60 * 1000); // Add duration
    
    //     const start2 = formatDate(event2.date, event2.time, event2.ampm);
    //     const end2 = new Date(start2.getTime() + event2.duration * 60 * 60 * 1000);
    
    //     return (start1 < end2 && start2 < end1); // Returns true if overlapping
    // };

    const isTimeOverlapping = (event1, event2) => {
        try {
            console.log("Timeoverlapping");
            if (!event1 || !event2) return false; // Ensure valid inputs
            
            // Convert event times to comparable formats (if necessary)
            const startTime1 = new Date(event1.date);
            const endTime1 = new Date(startTime1.getTime() + event1.duration * 60 * 1000);
            
            const startTime2 = new Date(event2.date);
            const endTime2 = new Date(startTime2.getTime() + event2.duration * 60 * 1000);
    
            // Check if the events overlap
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
            
            // const data = await response.json();
            // console.log(data)
            // setEvents(data);
            const { EventsDetails, acceptedEventDetails } = await response.json();
            console.log(EventsDetails);
            console.log(acceptedEventDetails);
            // Detect conflicts
            // const updatedEvents = EventsDetails.map(event => ({
            //     ...event,
            //     hasConflict: acceptedEventDetails.some(acceptedEvent =>
            //         isTimeOverlapping(event, acceptedEvent)
            //     )
            // }));

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
            // toastError(data.message);
            console.error("Error:", error);
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
            toastError(error.message);
        }
    };

    // Function to change event status (boolean toggle)
    const toggleEventStatus = async (eventId, currentStatus) => {

        console.log(eventId, currentStatus)
        try {
            // const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/event/update-status?eventId=${eventId}&isActive=${!currentStatus}`, {
            //     method: "PUT",
            //     headers:
            //     {
            //         "Content-Type": "application/json",
            //         "Authorization": `${localStorage.getItem("token")}`
            //     },
            // });

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