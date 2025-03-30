import "./ParticipantModal.css"
const ParticipantModal = ({ event, onClose }) => {
    console.log(event);
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Participant <span className="Parti_count">({event.participants.length})</span></h2>
                <button onClick={onClose}>✖</button>
                <ul>
                    {event.participants.map(participant => (
                        <li className="lirows" key={participant._id}>
                            <span className="namelabel"> {participant.firstname} {participant.lastname}</span>
                            <span style={{ fontSize: "20px" }}>
                                {event.userStatus === "Accepted"
                                    ? "✅"
                                    : event.userStatus === "Rejected"
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