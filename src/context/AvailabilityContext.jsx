import React, { createContext, useState, useContext } from "react";
import { useEvent } from "./EventContext";

// Create Context
const AvailabilityContext = createContext();

// Provider Component
export const AvailabilityProvider = ({ children }) => {
    const { userId} = useEvent(useContext);
  const [availability, setAvailability] = useState([]);

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
      .then((data) => console.log("Response:", data))
      .catch((err) => console.error("Error:", err));
  };

  return (
    <AvailabilityContext.Provider value={{ availability, saveAvailability }}>
      {children}
    </AvailabilityContext.Provider>
  );
};

// Custom Hook to use Availability Context
export const useAvailability = () => useContext(AvailabilityContext);
