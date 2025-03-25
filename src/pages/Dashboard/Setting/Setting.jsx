import React, { useState } from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar'
import Header from '../../../components/Header/Header'
import { toastSuccess, toastError } from '../../../utils'
import "./Setting.css"

function Setting() {

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;
  const {firstname, lastname, email } = user;

  const [formData, setFormData] = useState({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: "",
    confirm_password: "",
});

const handleChange = (e) => {
  const updatedFormData = { ...formData, [e.target.name]: e.target.value };
setFormData(updatedFormData);
localStorage.setItem("storedUser", JSON.stringify(updatedFormData));
};

const handleSave = async () => {
  const { firstname, lastname, email, password} = formData;
  const response = await fetch(`http://localhost:5000/api/user/profile_update/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json" ,
      "Authorization": `${localStorage.getItem("token")}`
    },
    body: JSON.stringify({ firstname, lastname, email, password }),
  });
  
  const data = await response.json();
  console.log(data);
  if (data) {
    toastSuccess("Profile updated successfully")
      localStorage.setItem("storedUser", JSON.stringify(formData));
  } else {
    toastError("Something went wrong")
  }
};

  return (

    <div className='DashboardContainer'>

      <Sidebar />

      <div className='dashboard-wrapper'>

        <Header />

        <div className='Settings-wrapper'>

          <h2>Edit Profile</h2>

          <hr className='Line'/>

          <div className='credentials-box'>

            <label className='Setting-label' htmlFor="firstname">First name</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              className='signup-input'
              value={formData.firstname}
              onChange={handleChange}
              required
            />




            <label className='Setting-label' htmlFor="lastname">Last name</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              className='signup-input'
              value={formData.lastname}
              onChange={handleChange}
              required
            />

            <label className='Setting-label' htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className='signup-input'
              value={formData.email}
              onChange={handleChange}
              required
            />


            <label className='Setting-label' htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className='signup-input'
              value={formData.password}
              onChange={handleChange}
              required
            />

            <label className='Setting-label' htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm_password"
              className='signup-input'
              value={formData.confirm_password}
              onChange={handleChange}
              required
            />

          </div>

          <div className='save-Div'>
            <button className='btn-save' onClick={handleSave} style={{ marginRight: "1.5rem" }} >Save</button>
          </div>

        </div>

      </div>

    </div>

  )
}

export default Setting