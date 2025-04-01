import Logo from '../../assets/WebAppColorLogo.png'
import AuthFrame from '../../assets/Auth_RSideImg.png'
import { useState } from 'react'
import './login.css'
import { toastSuccess ,toastError } from '../../utils'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  const handleLogin = async () => {
    const { username, password } = formData;

    if (!username || !password) {
      return toastError("Credentials are required!");
    }
    const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (data.token) {
      toastSuccess(data.message);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate('/events');
    }
    else {
      toastError(data.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  }

  return (
    <div className="Auth-Container">

      <div className="Auth-left">
        <div className='left-Header LogoAuth'>

          <img className='logo' src={Logo} alt="WebApp-logo" />
          <h1 className='WebAppName'>CNNCT</h1>

        </div>

        <div className='Signin-section'>
        <h1 className='heading'>Sign in</h1>

          <div className='input-box'>
            <input
              type="text"
              id="username"
              name="username"
              className='signin-input noborder'
              placeholder='Username'
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />

            <input
              type="password"
              id="password"
              name="password"
              placeholder='Password'
              className='signin-input noborder'
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

          </div>

          <button className='btn-login' type='submit' onClick={handleSubmit} >
            Log in
          </button>

          <p className='signup-link'>
            Don't have an account? <span className='underline' onClick={() => navigate('/signup')} >Sign up</span>
          </p>

        </div>

        <p className='Login-TnC-description'>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
      </div>

      <div className="Auth-right">
        <img className='auth-frame' src={AuthFrame} alt="banner" />
      </div>
    </div>

  )
}

export default LoginPage