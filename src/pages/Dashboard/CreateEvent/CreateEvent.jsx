import React, { useState } from 'react'
import "./CreateEvent.css"
import ProfilePic from "../../../assets/UserDP.png"
import Sidebar from '../../../components/Sidebar/Sidebar'
import Header from '../../../components/Header/Header';
import { toastSuccess, toastError } from '../../../utils';

function CreateEvent() {
  // const registeredUsers = ["qwe@asd.com", "rty@asd.com"];

  const userData = JSON.parse(localStorage.getItem("user") || "{}");

  const { username } = userData;
  const [step, setStep] = useState(1);

  const circles = [
    { id: 1, color: "#342B26" },
    { id: 2, color: "#258719" },
    { id: 3, color: "#000000" },
  ];

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
      bgColor: value,  // Correct way to update bgColor
    }));
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


    const payload = {
      hostname: userData._id,
      topic: formData.eventTopic,
      password: formData.password,
      description: formData.description,
      date: formData.date,  // No need to format here
      time: formData.time,
      ampm: formData.meridian,
      timezone: formData.timezone,
      duration: formData.duration, // Sent as string, backend converts it
      backgroundColor: formData.backgroundColor || "#1877F2",
      eventLink: formData.link,
      participants: formData.emails, // Sent as array, backend ensures ObjectIds
      isActive: true,
      status: "Upcoming",
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/event/createEvent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }

      const data = await response.json();
      toastSuccess({message});
      console.log("Success:", data);
    } catch (error) {
      toastError({message});
      console.error("Error:", error);
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
                  onBlur={handleEmailChange} // Update on blur (lose focus)
                  onChange={handleEmailChange} // Update in real-time
                />
              </div>

            </div>

          }

        </div>

        <div className="button-group">
          <button type="button" className="cancel-btn">Cancel</button>
          <button type="submit" className="save-btn" onClick={handleSave}>Save</button>
        </div>


        {/*  */}


      </div>


    </div>

      

    </div>

  )
}

export default CreateEvent