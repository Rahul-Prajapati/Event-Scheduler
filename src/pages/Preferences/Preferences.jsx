import Logo from '../../assets/WebAppColorLogo.png'
import AuthFrame from '../../assets/Auth_RSideImg.png'
import { useEffect, useState } from 'react'
import './Preferences.css'
import { useNavigate } from 'react-router-dom'
import { toastSuccess ,toastError } from '../../utils'

const Preferences = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    selectedCategory: ""
  })

  useEffect(() => {
    const savedCategory = localStorage.getItem("selectedCategory");
    if (savedCategory) {
      setFormData((prevFormData) => ({ ...prevFormData, selectedCategory: savedCategory }));
    }


    const savedUsername = localStorage.getItem("username");
    if (username) {
      setFormData((prevFormData) => ({ ...prevFormData, username: savedUsername }));
    }
  }, []);

  const categories = [
    { name: "Sales", emoji: "🏢" },
    { name: "Finance", emoji: "💵" },
    { name: "Consulting", emoji: "📊" },
    { name: "Tech", emoji: "🖥️" },
    { name: "Education", emoji: "📖" },
    { name: "Government & Politics", emoji: "⚖️" },
    { name: "Recruiting", emoji: "📄" },
    { name: "Marketing", emoji: "🚀" }
  ];

  const handleContinue = async () => {
    const { username, selectedCategory } = formData;
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user._id : null;
    console.log(userId);

    const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/user/preferences`, {
      method: "POST",
      headers:
      {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ userId, username, selectedCategory }),
    });

    const data = await response.json();
    console.log(data.user)
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      toastSuccess(data.message)
      navigate('/dashboard');
    }
    else {
      toastError("Something went wrong")
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    handleContinue();
  }

  return (
    <div className="Auth-Container">

      <div className="Auth-left">

        <div className='left-Header LogoAuth'>

          <img className='logo' src={Logo} alt="WebApp-logo" />
          <h1 className='WebAppName'>CNNCT</h1>

        </div>

        <div className='Signin-section font-secondary'>

          <h1 className='heading-pref'>Your Preferences</h1>

          <div className='username-box'>
            <input style={{ "color": "#000000" }}
              type="text"
              id="username"
              name="username"
              placeholder='Tell us about yourself'
              className='signin-input noborder'
              value={formData.username}
              onChange={(e) => {
                localStorage.setItem("username", e.target.value),
                  setFormData({ ...formData, username: e.target.value })
              }}
              required
            />

          </div>

          <div className='mini-box'>

            <p className='select-option' >Select one category that best describes your CNNCT:</p>

            <div className="categories">
              {categories.map((category) => (
                <button
                  key={category.name}
                  className={`category-btn ${formData.selectedCategory === category.name ? "selected" : ""
                    }`}
                  onClick={() => {
                    localStorage.setItem("selectedCategory", category.name),
                      setFormData({ ...formData, selectedCategory: category.name })

                  }}
                >
                  {category.emoji} {category.name}
                </button>
              ))}
            </div>

            <button className='btn-continue noborder' type='submit' onClick={handleSubmit} >
              Continue
            </button>

          </div>

        </div>

      </div>

      <div className="Auth-right">
        <img className='auth-frame' src={AuthFrame} alt="banner" />
      </div>
    </div>
  )

}

export default Preferences;