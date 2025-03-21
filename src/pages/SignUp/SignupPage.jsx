import Logo from '../../assets/WebAppColorLogo.png'
import AuthFrame from '../../assets/Auth_RSideImg.png'
import './Signup.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toastSuccess ,toastError } from '../../utils'
const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
    terms: false
  })

  const validateForm = () => {
    
    const { firstname, lastname, email, password, confirm_password } = formData;

    if (firstname.trim().length === 0) {
      return toastError("First name is required*");    
    }

    if (lastname.trim().length === 0) {
      return toastError("Last name is required*");
    }

    if (!formData.email.trim()) {
      return toastError("Email is required*");
    } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      return toastError("Invalid Email*");
    }

    if (!formData.password) {
      return toastError("Please enter your password*");
    } else if (formData.password.length < 8) {
      return toastError("Password must be at least 8 characters*");
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
      return toastError("At least 1 lowercase letter required*")
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      return toastError("At least 1 uppercase letter required*");
    } else if (!/(?=.*\d)/.test(formData.password)) {
      return toastError("At least 1 number required*");
    } else if (!/(?=.*[@#$%^&*!])/.test(formData.password)) {
      return toastError("At least 1 special character (@#$%^&*!)*");
    }

    if (!formData.confirm_password) {
      return toastError("Confirm password is required*");
    } else if (formData.password !== formData.confirm_password) {
      return toastError("The Password you entered does not match*");
    }

    if (!formData.terms) return toastError("You must agree to the terms*");

    return true;

  }

  const handleSignup = async () => {
    const { firstname, lastname, email, password } = formData;
    const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname, lastname, email, password }),
    });

    const data = await response.json();
    if (data.token) {
      toastSuccess(data.message)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate('/preferences');
    } else {
      toastError("Something went wrong")
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      handleSignup();
      console.log("Form submitted successfully", formData);
    }

  }


  return (
    <div className="Auth-Container">

      <div className="Auth-left">
        <div className='left-Header LogoAuth'>

          <img className='logo' src={Logo} alt="WebApp-logo" />
          <h1 className='WebAppName'>CNNCT</h1>

        </div>

        <div className='Signup-section'>

          <div className='Signup-form'>

            <form className='form' onSubmit={handleSubmit}>

              <div className='form-title'>

                <h3>Create an account</h3>
                <p onClick={() => navigate('/signin')}> Sign in instead</p>

              </div>

              <div className='credentials-box'>

                <label htmlFor="firstname">First name</label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  className='signup-input'
                  value={formData.firstname}
                  onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                  required
                />

                <label htmlFor="lastname">Last name</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  className='signup-input'
                  value={formData.lastname}
                  onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                  required
                />

                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className='signup-input'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />

                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className='signup-input'
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />

                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirm_password"
                  className='signup-input'
                  value={formData.confirm_password}
                  onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                  required
                />

              </div>

              <div className='checkbox-div'>
                <input
                  type="checkbox"
                  name="terms"
                  id="terms"
                  className='signup-input '
                  checked={formData.terms}
                  onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                />
                <label htmlFor="terms">
                  By creating an account, I agree to our <span>Terms of use</span>  and <span>Privacy Policy</span>
                </label>

              </div>

              <button className='btn-createAcc' type='submit'>
                Create an account
              </button>

            </form>

          </div>

        </div>

        <p className='TnC-description'>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>

      </div>

      <div className="Auth-right">
        <img className='auth-frame' src={AuthFrame} alt="SidebarImg" />
      </div>

    </div>
  )
}

export default SignupPage