import React, { useState, useEffect, useContext } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "./MyCalendar.css"; // Custom styling
import { BookEventContext } from "../../context/BookEventContext";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [view, setView] = useState("month"); // Default view: Week
  const [date, setDate] = useState(new Date()); // Current date
  const { allEvents, GetUserAllEvents } = useContext(BookEventContext);
  const [formattedEvents, setFormattedEvents] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage
    if (userId) {
      GetUserAllEvents(userId); // Fetch user events
    }
  }, []);

  useEffect(() => {
    if (allEvents.length > 0) {
      const newEvents = allEvents.map((event) => {
        const start = new Date(`${event.date} ${event.time} ${event.ampm}`);
        const duration = event.duration || 60; // Use DB duration, default to 1 hour
        const end = new Date(start.getTime() + duration * 60 * 1000);

        return {
          ...event,
          start,
          end,
          title: event.topic,
          backgroundColor: event.isActive ? event.backgroundColor : "#676767",
        };
      });

      setFormattedEvents(newEvents);
    }
  }, [allEvents]);

  // Custom Event Component
  const EventComponent = ({ event }) => (
    <>
    <div className="custom-event">
      <span className="event-time">
        {moment(event.start).format("h:mm A")}
      </span>
      <span className="event-title">{event.title}</span>
    </div>
    </>
  );

  // Move to Today
  const goToToday = () => setDate(new Date());

  // Navigate Backward (Previous)
  const goBack = () => {
    const newDate = moment(date).subtract(1, view).toDate();
    setDate(newDate);
  };

  // Navigate Forward (Next)
  const goNext = () => {
    const newDate = moment(date).add(1, view).toDate();
    setDate(newDate);
  };

  const EventCellWrapper = ({ children, value }) => {
    const eventsForSlot = formattedEvents.filter(event =>
      moment(event.start).isSame(value, "day")
    );
    
    return (
      <div className="event-cell-wrapper">
        {eventsForSlot.slice(0, 2).map(event => (
          <EventComponent key={event.id} event={event} />
        ))}
        {eventsForSlot.length > 2 && (
          <button className="more-events-btn" onClick={() => setSelectedSlot(value)}>
            +{eventsForSlot.length - 2} more
          </button>
        )}
        {children}
      </div>
    );
  };
  


  return (
    <div className="calendar-container">
      <div className="calendar-controls">
        {/* <button onClick={goBack}>⏪ Back</button>
        <button onClick={goToToday}>📅 Today</button>
        <button onClick={goNext}>⏩ Next</button> */}

        {/* View Selection */}
        {/* <select value={view} onChange={(e) => setView(e.target.value)}>
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select> */}
      </div>

      <Calendar
        localizer={localizer}
        events={formattedEvents}
        startAccessor="start"
        endAccessor="end"
        view={view}
        date={date}
        onView={(newView) => setView(newView)}
        onNavigate={(newDate) => setDate(newDate)}
        components={{
          event: EventComponent, // Custom event renderer
          // dateCellWrapper: EventCellWrapper,
        }}
        min={new Date(2024, 0, 1, 9, 0)} // Start at 9 AM
        max={new Date(2024, 0, 1, 17, 0)} // End at 4 PM
        dayPropGetter={(date) => {
          const isWeekend = date.getDay() === 0 || date.getDay() === 6; // Sat-Sun
          return {
            style: isWeekend ? { backgroundColor: "#F9FAFB" } : {},
          };
        }}
        eventPropGetter={(event) => ({
          style: { backgroundColor: "rgba(14, 165, 233, 0.1)", borderLeft: "4px solid #3B82F6" },
        })}
        style={{ height: "65vh", backgroundColor: "#FFFFFF" }}
      />
    </div>
  );
};

export default MyCalendar;
