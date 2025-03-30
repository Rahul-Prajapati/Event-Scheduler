import { useContext } from "react";
import { useBookEvent } from "../../context/BookEventContext";
import { formatDateDDMON } from "../../utils";
import "./BookCard.css"

const BookCard = ({ event, setSelectedEvent }) => {

    const { handleStatus } = useBookEvent(useContext);
    return (
        <div className="BookEventCard">
            <div>
                <p>{formatDateDDMON(event.date)}</p>
                <p className="EventTimeDetails">{event.time}</p>

            </div>

            <div>
                <p className="eventTopic">{event.topic}</p>
            </div>

            {/* <p>{event.userStatus }</p> */}


            <div>
                {event.userStatus === "Pending" ? (
                    <>
                        <button onClick={() => handleStatus(event, "Accepted")} style={{ backgroundColor: "#00C35F", color: "#FFFFFF", padding: "8px 12px", border: "none", borderRadius: "4px" }}>
                            Accept
                        </button>
                        <button onClick={() => handleStatus(event, "Rejected")}  style={{ backgroundColor: "#ED0000", color: "#FFFFFF", padding: "8px 12px", border: "none", borderRadius: "4px", marginLeft: "8px" }}>
                            Reject
                        </button>
                    </>
                ) : event.userStatus === "Accepted" ? (
                    <p  style={{  width: "95px" ,backgroundColor: "rgba(0, 0, 0, 0.2)", color: "#FFFFFF", padding: "8px 12px", borderRadius: "4px" }}>
                        Accepted
                    </p>
                ) : event.userStatus === "Rejected" ? (
                    <p  style={{ width: "90px" ,backgroundColor: "#616161", color: "#FFFFFF", padding: "8px 12px", border: "1px solid #FFFFFF", borderRadius: "4px"}}>
                        Rejected
                    </p>
                ) : null}

{/* onClick={handleStatus(event._id)} */}

            </div>

            <button className="ViewParticipant" onClick={() => setSelectedEvent(event)}>{event.participants.length} Participants</button>
        </div>
    );
};

export default BookCard;