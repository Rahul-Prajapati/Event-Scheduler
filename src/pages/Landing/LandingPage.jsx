import React from 'react'
import './LandingPage.css'
import Logo from '../../assets/WebAppColorLogo.png'
import BookingSnap from '../../assets/BookingHomePagePic.png'
import AvailabilityImg from '../../assets/AvailabilityHomePagePic.png'
import CalenderImg from '../../assets/CalenderHomePagePic.png'
import Testimonials from '../../components/Testimonial/Testimonials'
import FeatureGrid from '../../components/Features/FeatureGrid'
import Footer from '../../components/Footer/Footer'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className='Container'>

      <section className='Header'>
        <div className='left-Header'>
          <img className='logo' src={Logo} alt="WebApp-logo" />

          <h1 className='WebAppName'>CNNCT</h1>


        </div>

        <button className='right-Header' onClick={() => navigate('/signup')}>
          Sign up free
        </button>

      </section>

      <section className='Demo-Section'>

        <h1 className='title'>
          CNNCT – Easy <br /> Scheduling Ahead
        </h1>

        <div className='button-div'>

          <button className='right-Header btnH_W' onClick={() => navigate('/signup')}>
            Sign up free
          </button>
        </div>

        <img className='BookingSnap' src={BookingSnap} alt="" />

        <h3 className='font-secondary feature-heading-1'>
          Simplified scheduling for you and your team
        </h3>

        <h4 className='font-secondary feature-heading-2'>
          CNNCT eliminates the back-and-forth of scheduling meetings so you can focus on what matters. Set your availability, share your link, and let others book time with you instantly.
        </h4>

        {/*  */}

        <div className='Calender-Meetings font-secondary'>
          <div className='Text-section'>
            <h4>Stay Organized with Your <br /> Calendar & Meetings</h4>

            <div className=''>

              <p>Seamless Event Scheduling</p>
              <ul className='text-style'>

                <li>View all your upcoming meetings and appointments in one place.</li>
                <li>Syncs with Google Calendar, Outlook, and iCloud to avoid conflicts.</li>
                <li>Customize event types: one-on-ones, team meetings, group sessions, and webinars.</li>

              </ul>
            </div>

          </div>

          <div className="image-section">
            <img className='Avail_Img' src={AvailabilityImg} alt="left" />
            <img className='cal_Img' src={CalenderImg} alt="right" />
          </div>
        </div>
        {/*  */}
        </section>

        

        <section className='section-container'>

        <Testimonials />

        <FeatureGrid />

        <Footer />
          
        </section>






    </div>
  )
}

export default LandingPage