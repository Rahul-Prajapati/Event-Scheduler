import { useEffect, useState } from "react";
import "./ParticipantModal.css"
const ParticipantModal = ({ event, onClose }) => {
    const [participants, setParticipants] = useState([]);
    const [eventId, setEventId] = useState(event._id);

    useEffect(() => {
        const loadParticipants = async () => {
            // setLoading(true);
            const data = await fetchParticipants(eventId);
            setParticipants(data);
            // setLoading(false);
        };

        loadParticipants();
    }, [eventId]);


    const fetchParticipants = async (eventId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/book/participants/${eventId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch participants");
            }
    
            const { participants } = await response.json();
            return participants;
        } catch (error) {
            console.error("Error:", error);
            return [];
        }
    };

    console.log(event);
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Participant <span className="Parti_count">({event.participants.length})</span></h2>
                <button onClick={onClose}>✖</button>
                <ul>
                    {participants.map(participant => (
                        <li className="lirows" key={participant._id}>
                            <span className="namelabel"> {participant.firstname} {participant.lastname}</span>
                            <span style={{ fontSize: "20px" }}>
                                {participant.status === "Accepted"
                                    ? "✅"
                                    : participant.status === "Rejected"
                                        ? "❌"
                                        : "⬜"}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ParticipantModal;