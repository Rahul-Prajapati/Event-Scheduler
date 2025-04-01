// import React, { useState } from "react";
// import "./AvailabilityForm.css";

// const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// const AvailabilityForm = () => {
//   const [availability, setAvailability] = useState(
//     daysOfWeek.map((day) => ({ day, checked: day !== "Sun", slots: [{ startTime: "", endTime: "" }] }))
//   );

//   const handleCheckboxChange = (index) => {
//     const updatedAvailability = [...availability];
//     updatedAvailability[index].checked = !updatedAvailability[index].checked;
//     setAvailability(updatedAvailability);
//   };

//   const handleTimeChange = (index, slotIndex, field, value) => {
//     const updatedAvailability = [...availability];
//     updatedAvailability[index].slots[slotIndex][field] = value;
//     setAvailability(updatedAvailability);
//   };

//   const addSlot = (index) => {
//     const updatedAvailability = [...availability];
//     updatedAvailability[index].slots.push({ startTime: "", endTime: "" });
//     setAvailability(updatedAvailability);
//   };

//   const removeSlot = (index, slotIndex) => {
//     const updatedAvailability = [...availability];
//     updatedAvailability[index].slots.splice(slotIndex, 1);
//     setAvailability(updatedAvailability);
//   };

//   const cloneSlot = (index, slotIndex) => {
//     const updatedAvailability = [...availability];
//     const clonedSlot = { ...updatedAvailability[index].slots[slotIndex] };
//     updatedAvailability[index].slots.push(clonedSlot);
//     setAvailability(updatedAvailability);
//   };

//   const handleSubmit = () => {
//     console.log("Availability Data:", availability);
//     // Call API to save the availability data
//   };

//   return (
//     <div className="availability-container">
//       <div className="header">
//         <div className="activity">Activity <span>Event type ▼</span></div>
//         <div className="timezone">Time Zone <span>Indian Time Standard ▼</span></div>
//       </div>
//       <h2 className="title">Weekly hours</h2>
//       <div className="availability-list">
//         {availability.map((day, index) => (
//           <div key={index} className="availability-item">
//             <input
//               type="checkbox"
//               className="Availability-check"
//               checked={day.checked}
//               onChange={() => handleCheckboxChange(index)}
//             />
//             <span className="day-label">{day.day}</span>
//             {day.checked ? (
//               <div className="time-slots">
//                 {day.slots.map((slot, slotIndex) => (
//                   <div key={slotIndex} className="time-slot">
//                     <input
//                       type="time"
//                       value={slot.startTime}
//                       onChange={(e) =>
//                         handleTimeChange(index, slotIndex, "startTime", e.target.value)
//                       }
//                     />
//                     <span>-</span>
//                     <input
//                       type="time"
//                       value={slot.endTime}
//                       onChange={(e) =>
//                         handleTimeChange(index, slotIndex, "endTime", e.target.value)
//                       }
//                     />
//                     <button className="remove-btn" onClick={() => removeSlot(index, slotIndex)}>❌</button>
//                     <button className="clone-btn" onClick={() => cloneSlot(index, slotIndex)}>📄</button>
//                   </div>
//                 ))}
//                 <button className="add-slot-btn" onClick={() => addSlot(index)}>➕</button>
//               </div>
//             ) : (
//               <span className="unavailable-label">Unavailable</span>
//             )}
//           </div>
//         ))}
//       </div>
//       <button className="save-btn" onClick={handleSubmit}>Save Availability</button>
//     </div>
//   );
// };

// export default AvailabilityForm;

// import React, { useState } from "react";
// import "./AvailabilityForm.css";

// const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// const AvailabilityForm = () => {

//   const [startTime, setStartTime] = useState({ hour: "12", minute: "00", period: "AM" });
//   const [endTime, setEndTime] = useState({ hour: "12", minute: "00", period: "AM" });

//   const handleChange = (event, type, field) => {
//     const value = event.target.value;
//     if (type === "start") {
//       setStartTime({ ...startTime, [field]: value });
//     } else {
//       setEndTime({ ...endTime, [field]: value });
//     }
//   };

//   const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
//   const minutes = ["00", "15", "30", "45"];
//   const periods = ["AM", "PM"];




//   const [schedule, setSchedule] = useState(
//     days.map((day) => ({ day, checked: day !== "Sun", slots: [{ from: "09:00 AM", to: "05:00 PM" }] }))
//   );

//   const handleCheckboxChange = (index) => {
//     const newSchedule = [...schedule];
//     newSchedule[index].checked = !newSchedule[index].checked;
//     setSchedule(newSchedule);
//   };

//   const handleTimeChange = (index, slotIndex, field, value) => {
//     const newSchedule = [...schedule];
//     newSchedule[index].slots[slotIndex][field] = value;
//     setSchedule(newSchedule);
//   };

//   const addSlot = (index) => {
//     const newSchedule = [...schedule];
//     newSchedule[index].slots.push({ from: "09:00 AM", to: "05:00 PM" });
//     setSchedule(newSchedule);
//   };

//   const removeSlot = (index, slotIndex) => {
//     const newSchedule = [...schedule];
//     newSchedule[index].slots.splice(slotIndex, 1);
//     setSchedule(newSchedule);
//   };

//   return (
//     <div className="availability-container">

// <div>
//       <h2>Select Start and End Time</h2>
//       <div>
//         <label>Start Time: </label>
//         <select value={startTime.hour} onChange={(e) => handleChange(e, "start", "hour")}>
//           {hours.map((hour) => (
//             <option key={hour} value={hour}>{hour}</option>
//           ))}
//         </select>
//         :
//         <select value={startTime.minute} onChange={(e) => handleChange(e, "start", "minute")}>
//           {minutes.map((minute) => (
//             <option key={minute} value={minute}>{minute}</option>
//           ))}
//         </select>
//         <select value={startTime.period} onChange={(e) => handleChange(e, "start", "period")}>
//           {periods.map((period) => (
//             <option key={period} value={period}>{period}</option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label>End Time: </label>
//         <select value={endTime.hour} onChange={(e) => handleChange(e, "end", "hour")}>
//           {hours.map((hour) => (
//             <option key={hour} value={hour}>{hour}</option>
//           ))}
//         </select>
//         :
//         <select value={endTime.minute} onChange={(e) => handleChange(e, "end", "minute")}>
//           {minutes.map((minute) => (
//             <option key={minute} value={minute}>{minute}</option>
//           ))}
//         </select>
//         <select value={endTime.period} onChange={(e) => handleChange(e, "end", "period")}>
//           {periods.map((period) => (
//             <option key={period} value={period}>{period}</option>
//           ))}
//         </select>
//       </div>
//       <p>Selected Start Time: {startTime.hour}:{startTime.minute} {startTime.period}</p>
//       <p>Selected End Time: {endTime.hour}:{endTime.minute} {endTime.period}</p>
//     </div>




//       {schedule.map((item, index) => (
//         <div key={index} className="day-row">
//           <input
//             type="checkbox"
//             checked={item.checked}
//             onChange={() => handleCheckboxChange(index)}
//           />
//           <span>{item.day}</span>
//           {item.checked && (
//             <div className="slots-container">
//               {item.slots.map((slot, slotIndex) => (
//                 <div key={slotIndex} className="slot">
//                   <input
//                     type="time"
//                     value={slot.from}
//                     onChange={(e) => handleTimeChange(index, slotIndex, "from", e.target.value)}
//                   />
//                   <span>-</span>
//                   <input
//                     type="time"
//                     value={slot.to}
//                     onChange={(e) => handleTimeChange(index, slotIndex, "to", e.target.value)}
//                   />
//                   <button onClick={() => removeSlot(index, slotIndex)}>X</button>
//                 </div>
//               ))}
//               <button onClick={() => addSlot(index)}>+</button>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AvailabilityForm;

import React, { useState } from "react";
import "./AvailabilityForm.css";
import { useAvailability } from "../../context/AvailabilityContext";

const AvailabilityForm = () => {
  const { saveAvailability } = useAvailability();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

  // Initialize availability state
  const [availability, setAvailability] = useState(
    daysOfWeek.map((day) => ({
      day,
      isEnabled: day !== "Sun", // Sunday disabled, others enabled by default
      slots: day === "Sun" ? [] : [{ startTime: "", endTime: "" }], // Mon-Sat get 1 slot by default
    }))
  );

  // Handle time input change
  const handleTimeChange = (index, slotIndex, field, value) => {
    const updatedAvailability = [...availability];
    updatedAvailability[index].slots[slotIndex][field] = value;
    setAvailability(updatedAvailability);
  };

  // Add a time slot
  const addSlot = (index) => {
    const updatedAvailability = [...availability];
    updatedAvailability[index].slots.push({ startTime: "", endTime: "" });
    setAvailability(updatedAvailability);
  };

  // Remove a time slot
  const removeSlot = (index, slotIndex) => {
    const updatedAvailability = [...availability];
    updatedAvailability[index].slots.splice(slotIndex, 1);
    setAvailability(updatedAvailability);
  };

  // Handle save (send data to backend)
  const handleSave = () => {
    saveAvailability(availability);
  };

  return (
    <div className="availability-container">
      <h3>Weekly hours</h3>
      {availability.map((day, index) => (
        <div key={day.day} className="day-row">
          <input
            type="checkbox"
            checked={day.isEnabled}
            disabled={day.day === "Sun"} // Disable Sunday
          />
          <span>{day.day}</span>
          {day.day === "Sun" && <span className="unavailable-text">Unavailable</span>}

          <div>
          {day.isEnabled &&
            day.slots.map((slot, slotIndex) => (
              <div key={slotIndex} className="time-slot">
                <input
                  type="text"
                  className="aval-time-input"
                  placeholder="Start Time (e.g., 09:00 AM)"
                  value={slot.startTime}
                  onChange={(e) => handleTimeChange(index, slotIndex, "startTime", e.target.value)}
                />
                <span> - </span>
                <input
                  type="text"
                  className="aval-time-input"
                  placeholder="End Time (e.g., 05:00 PM)"
                  value={slot.endTime}
                  onChange={(e) => handleTimeChange(index, slotIndex, "endTime", e.target.value)}
                />
                {day.slots.length > 1 && (
                  <button onClick={() => removeSlot(index, slotIndex)}>❌</button>
                )}
              </div>
            ))}
          </div>

          {day.isEnabled && (
            <button className="btn-add" onClick={() => addSlot(index)}>➕</button>
          )}
        </div>
      ))}

      <button className="save-btn" onClick={handleSave}>
        Save Availability
      </button>
    </div>
  );
};

export default AvailabilityForm;
