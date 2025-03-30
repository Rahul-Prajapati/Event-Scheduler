import { createContext, useContext, useEffect, useState } from "react";
import { useEvent } from "./EventContext";
import { toastError, toastSuccess } from "../utils";


export const BookEventContext = createContext();

export const BookEventProvider = ({children}) =>{

    const {userId} = useEvent(useContext);

    console.log(userId);

    const [allEvents, setAllEvents] = useState([]);

    const [filteredEvents, setFilteredEvents] = useState({
        upcoming: [],
        pending: [],
        cancelled: [],
        past: []
    });

    useEffect(()=>{
        console.log(userId);

        GetUserAllEvents(userId);
    
    },[])

    
    const GetUserAllEvents = async(userId)=>{
        try {
            console.log("GEt All User Data")
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/event/allevents/${userId}`, {
                method: "GET",
                headers:
                {
                    "Content-Type": "application/json",
                    // "Authorization": `${localStorage.getItem("token")}`
                  },
            });
    
            if (!response.ok) {
                throw new Error("Failed to fetch events");
            }
    
            const data = await response.json();
            setAllEvents(data);
            console.log("User Events:", data);
            filterEvents(data);
            // return data;
        } catch (error) {
            console.error("Error fetching events:", error);
            // return [];
        }


    }

    const filterEvents = (events) => {
        const now = new Date();

        const Upcoming = events.filter(event =>
            event.userStatus === "Accepted" &&
            new Date(formatDate(event.date, event.time, event.ampm)) >= now &&
            event.status === "Upcoming"
        );

        const Pending = events.filter(event => event.userStatus === "Pending" && new Date(formatDate(event.date, event.time, event.ampm)) >= now );

        const Cancelled = events.filter(event => event.userStatus === "Rejected");

        const Past = events.filter(event =>
            new Date(formatDate(event.date, event.time, event.ampm)) < now
        );

        setFilteredEvents({ Upcoming, Pending, Cancelled, Past });
    };

    const formatDate = (date, time, ampm) => {
        // Convert event date (YYYY-MM-DD) into parts
        const [year, month, day] = date.split("-").map(Number);
        
        // Convert event time into hours and minutes
        let [hours, minutes] = time.split(":").map(Number);
    
        // Adjust for AM/PM format
        if (ampm === "PM" && hours !== 12) hours += 12;
        if (ampm === "AM" && hours === 12) hours = 0;
    
        // Return valid Date object
        return new Date(year, month - 1, day, hours, minutes);
    };

    const handleStatus = async(event, NewStatus) =>{

        const now = new Date();

        if (!NewStatus) {
            console.error("NewStatus is undefined!");
            return;
        }

        if (new Date(formatDate(event.date, event.time, event.ampm)) <= now) {
            toastError("Can't Modify Past Events Data");
            return;
        }

        try {

            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/book/update-status`, {
                method: "PUT",
                headers: 
                {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("token")}`
                },
                body: JSON.stringify({eventId: event._id, userId, status: NewStatus }),
            });
    
            const data = await response.json();
            if (response.ok) {
                toastSuccess(data.message);
                // Optionally, refresh data or update state
                setAllEvents(prevEvents => 
                    prevEvents.map(event => 
                        event._id === data.booking._id ? { ...event, userStatus: NewStatus } : event
                    )
                );
        
                // **Step 3: Re-filter Events**
                filterEvents(allEvents.map(event => 
                    event._id === data.booking._id  ? { ...event, userStatus: NewStatus } : event
                ));

            } else {
                toastError(data.message);
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }

        

    }



    return (
        <BookEventContext.Provider value={{ allEvents, filteredEvents, GetUserAllEvents, handleStatus }}>
            {children}
        </BookEventContext.Provider>
    )

}

export const useBookEvent = () => useContext(BookEventContext);