import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css"

const Header = () => {
  const commonCreateEventHeader = { 
    title: "Create Event", 
    subtitle: "Create events to share for people to book on your calendar. New" 
};

const headers = {
        "/events": { title: "Event Types", subtitle: "Create events to share for people to book on your calendar. New" },
        "/createEvent": commonCreateEventHeader,
        "/booking": { title: "Booking", subtitle: "See upcoming and past events booked through your event type links." },
        "/settings": { title: "Profile", subtitle: "Manage settings for your profile" },
        "/availability": { title: "Availability", subtitle: "Configure times when you are available for bookings" },
        "/createEvent/:eventId" : commonCreateEventHeader,
};
      
  const location = useLocation();
  const navigate = useNavigate();
  // const currentHeader = headers[location.pathname] || { title: "", subtitle: "" };
  const currentHeader = headers[location.pathname] || commonCreateEventHeader;
  return (
    <header className="header-wrapper">
      <h1 className="header-title">{currentHeader.title}</h1>
      <p className="header-Subtitle">{currentHeader.subtitle}</p>

      {(location.pathname === "/events") && (
                <div className='addNewEventDiv'>
                    <button
                        className="read-button"
                        onClick={() => navigate("/createEvent")}
                    >
                        +   Add New Event
                    </button>
                </div>

            )}
    </header>
  );
};

export default Header;
