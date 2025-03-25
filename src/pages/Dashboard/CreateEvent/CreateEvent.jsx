import React, { useContext, useEffect, useState } from 'react'
import "./CreateEvent.css"
import ProfilePic from "../../../assets/UserDP.png"
import Sidebar from '../../../components/Sidebar/Sidebar'
import Header from '../../../components/Header/Header';
import { toastSuccess, toastError } from '../../../utils';
import { useNavigate, useParams } from 'react-router-dom';
import { useEvent } from '../../../context/EventContext';

function CreateEvent() {

  const navigate = useNavigate();

  const { eventId } = useParams(); 
  const { events, CreateNewEvent, UpdateEventDetails } = useEvent(useContext);

  const userData = JSON.parse(localStorage.getItem("user") || "{}");

  const { username } = userData;

  const [formData, setFormData] = useState({
    eventTopic: "",
    password: "",
    hostName: username,
    description: "",
    date: "",
    time: "",
    meridian: "AM",
    timezone: "(UTC +5:30 Delhi)",
    duration: "1 hour",
    bgColor: "",
    link: "",
    emails: [],
  });

  const handleEditEvent = (selectedEvent) => {
    setFormData({
        eventTopic: selectedEvent.topic || "",  // Mapping topic → eventTopic
        password: selectedEvent.password || "",
        hostName: username, // Mapping hostname → hostName
        description: selectedEvent.description || "",
        date: selectedEvent.date || "",
        time: selectedEvent.time || "",
        meridian: selectedEvent.ampm || "AM", // Mapping ampm → meridian
        timezone: selectedEvent.timezone || "(UTC +5:30 Delhi)",
        duration: `${selectedEvent.duration} hour` || "1 hour", // Ensure proper formatting
        bgColor: selectedEvent.backgroundColor || "", // Mapping backgroundColor → bgColor
        link: selectedEvent.eventLink || "", // Mapping eventLink → link
        emails: selectedEvent.participants 
            ? selectedEvent.participants.map(p => p.email) 
            : (""), // Extracting emails from participants
    });
};

  useEffect(() => {
    if (events.length > 0) {
        const selectedEvent = events.find(event => event._id === eventId);
        console.log(selectedEvent);
        if (selectedEvent) {
          console.log(selectedEvent);
          
          handleEditEvent(selectedEvent);
          // console.log(formData);  
          // localStorage.setItem("EditForm", JSON.stringify(formData));
        }
    }
}, [eventId, events]);


  const [step, setStep] = useState(1);

  const circles = [
    { id: 1, color: "#342B26" },
    { id: 2, color: "#258719" },
    { id: 3, color: "#000000" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCircleClick = (value) => {
    setFormData((prev) => ({
      ...prev,
      bgColor: value,  
    }));

    console.log(formData.bgColor);
  }


  
  const handleEmailChange = (e) => {
    const inputEmails = e.target.value;
    const emailArray = inputEmails
      .split(",") // Split by comma
      .map(email => email.trim()) // Trim spaces
      .filter(email => email !== ""); // Remove empty values

    setFormData((prev) => ({
      ...prev,
      emails: emailArray,
    }));
  };

  const handleSave = () => {
    localStorage.setItem("createForm", JSON.stringify(formData));

    if (step === 1) {
      setStep(2);
    }
    else {

      handleNewMeeting()

    }
  }

  const handleNewMeeting = async () => {

    console.log(formData);


    const payload = {
      hostname: userData._id,
      topic: formData.eventTopic,
      password: formData.password,
      description: formData.description,
      date: formData.date,  
      time: formData.time,
      ampm: formData.meridian,
      timezone: formData.timezone,
      duration: formData.duration, // Sent as string, backend converts it
      backgroundColor: formData.bgColor,
      eventLink: formData.link,
      participants: formData.emails, // Sent as array, backend ensures ObjectIds
    };


    { eventId ? 
      
      UpdateEventDetails(eventId,payload,navigate)
    :
      CreateNewEvent(payload,navigate)
    }



  }


  return (

    <div className='DashboardContainer'>

      <Sidebar />


    <div className='dashboard-wrapper'>

      <Header />

      <div className='creation-container'>

        <h1 className='creation-heading'>Add Event</h1>

        <hr className="full-width-line" />

        {/*  */}

        {step === 2 ?
          <div className='Banner-div'>
            <div className='Banner-bgcolor'>
              <img className='profileDemo' src={ProfilePic} alt="plo" />

              <p className='banner-username'>{formData.eventTopic}</p>

            </div>

            <div className='bg-selection'>
              <h3 className='custom-heading'>Custom Background Color</h3>

              <div className='bg-options'>

                <div className='circle-container'>
                  {circles.map((circle) => (
                    <div style={{ backgroundColor: `${circle.color}` }}
                      key={circle.id}
                      name="bgColor"
                      value={formData.bgColor}
                      className={`circle ${formData.bgColor === circle.color ? "selected" : ""}`}
                      onClick={() => handleCircleClick(circle.color)}
                    ></div>
                  ))}
                </div>

              </div>

              <div className='custom-bg-colors'>
                <div className='custom-container'>
                  <div className="color-preview"
                    style={{ backgroundColor: (formData.bgColor) ? formData.bgColor : "#888888" }}>

                  </div>

                  <div>
                    <input
                      type="text"
                      value={formData.bgColor}
                      onChange={(e) => handleCircleClick(e.target.value)}
                      className="color-input"
                    />
                  </div>

                </div>

              </div>


            </div>

          </div>

          :

          // {/*  */}
          <div className='event-form'>

            <div className="form-group">
              <label>Event Topic *</label>
              <input
                type="text"
                name="eventTopic"
                placeholder="Set a conference topic before it starts"
                value={formData.eventTopic}
                onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange} />
            </div>


            <div className="form-group">
              <label>Host name *</label>
              <input name="hostName" value={formData.hostName} readOnly />

            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange} >

              </textarea>
            </div>


          </div>

        }

        <hr className="full-width-line" />

        <div className='event-form'>

          {step === 1 ? <div>

            <div className="form-row">
              <div className="form-group">
                <label>Date and time *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange} />
              </div>

              <div className="form-group">
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange} />
                {/* <select>
  {[...Array(12)].map((_, i) => (
    <option key={i + 1}>{i + 1}:00</option>
  ))}
</select> */}
                {/* <select>
  <option>AM</option>
  <option>PM</option>
</select> */}
              </div>

              <div className="form-group">
                <select
                  name="meridian"
                  value={formData.meridian}
                  onChange={handleChange} >
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>

              <div className="form-group">
                <select
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleChange} >
                  <option>(UTC +5:30 Delhi)</option>
                </select>
              </div>

            </div>

            <div className="form-group">
              <label>Set duration</label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleChange}>
                <option>1 hour</option>
                <option>2 hour</option>
              </select>
            </div>

          </div>

            :

            <div>

              <div className="form-group">
                <label>Add Link</label>
                <input
                  type="url"
                  name="link"
                  placeholder="Enter link"
                  value={formData.link}
                  onChange={handleChange}
                />
              </div>


              <div className="form-group">
                <label>Add Emails</label>
                <input
                  type="text"
                  placeholder="example1@gmail.com, example2@gmail.com"
                  value={formData.emails.join(", ")}
                  onBlur={handleEmailChange} // Update on blur (lose focus)
                  onChange={handleEmailChange} // Update in real-time
                />
              </div>

            </div>

          }

        </div>

        <div className="button-group">
          <button type="button" className="cancel-btn" onClick={()=> setStep(1)}>Cancel</button>
          <button type="submit" className="save-btn" onClick={handleSave}>Save</button>
        </div>


        {/*  */}


      </div>

    </div>

    </div>

  )
}

export default CreateEvent