import React, { useState } from 'react'
import "./CreateEvent.css"
import Sidebar from '../../../components/Sidebar/Sidebar'

function CreateEvent() {
  const [step, setStep] = useState(1);

  const circles = [
    { id: 1, color: "#342B26" },
    { id: 2, color: "#258719" },
    { id: 3, color: "#000000" },
  ];

  const [formData, setFormData] = useState({
    eventTopic: "",
    password: "",
    hostName: "Sarthak Pal",
    description: "",
    date: "",
    time: "",
    meridian: "AM",
    timezone: "(UTC +5:30 Delhi)",
    duration: "1 hour",
    bgColor: ""
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

  const handleSave = () => {
    localStorage.setItem("createForm", JSON.stringify(formData));

    if (step === 1) {
      setStep(2);
    }
    else {
      console.log("form is submitted")
    }
  }


  return (

    <div className='EventContainer'>

      <Sidebar />

      <div className='creation-container'>


        <h1 className='creation-heading'>Add Event</h1>

        <hr className="full-width-line" />

        {/*  */}

        {step === 2 ?
             <div className='Banner-div'>
          <div className='Banner-bgcolor'>
            <img className='profileDemo' src="" alt="plo" />

            <span className='banner-username'>{formData.eventTopic}</span>
            <p className='Flame-username'>/{ }</p>
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
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange} />
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

  )
}

export default CreateEvent