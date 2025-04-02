import React, { createContext, useState, useContext, useEffect } from "react";
import { useEvent } from "./EventContext";
import { toastError, toastSuccess } from "../utils";

// Create Context
const AvailabilityContext = createContext();

// Provider Component
export const AvailabilityProvider = ({ children }) => {
    const { userId} = useEvent(useContext);
  const [availability, setAvailability] = useState([]);

  // Fetch Availability Data from Backend 
  useEffect(() => {
    if (!userId) return;

    fetch(`${import.meta.env.VITE_SERVER_API}/api/user/getAvailability?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.availability) {
          setAvailability(data.availability);
        }
      })
      .catch((err) => console.error("Error fetching availability:", err));
  }, [userId]);

  // Function to update availability and send to backend
  const saveAvailability = (availabilityData) => {
    setAvailability(availabilityData);

    // Send data to backend
    fetch(`${import.meta.env.VITE_SERVER_API}/api/user/updateAvailability`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userId , availability: availabilityData }),
    })
      .then((res) => res.json())
      .then((data) => toastSuccess(data.message))
      .catch((err) => toastError(data.message));
  };

  return (
    <AvailabilityContext.Provider value={{ availability, saveAvailability }}>
      {children}
    </AvailabilityContext.Provider>
  );
};

// Custom Hook to use Availability Context
export const useAvailability = () => useContext(AvailabilityContext);
