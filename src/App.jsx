import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Event/Event'
import LandingPage from './pages/Landing/LandingPage'
import LoginPage from './pages/Login/LoginPage'
import Preferences from './pages/Preferences/Preferences'
import SignupPage from './pages/SignUp/SignupPage'
import { Toaster } from 'react-hot-toast'
import Booking from './pages/Dashboard/Booking/Booking'
import CreateEvent from './pages/Dashboard/CreateEvent/CreateEvent'
import Events from './pages/Dashboard/Event/Event'
import Setting from './pages/Dashboard/Setting/Setting'
import { EventProvider } from './context/EventContext'
import { BookEventProvider } from './context/BookEventContext'
import Availability from './pages/Dashboard/Availability/Availability'
import { AvailabilityProvider } from './context/AvailabilityContext'


function App() {

  // authentication function
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null; // Replace with actual auth check
};

// Private Route Component
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/signin" />;
};

  return (
    <>
      <EventProvider>
        <BookEventProvider>
          <AvailabilityProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<LandingPage />} />

                <Route path='/signup' element={<SignupPage />} />

                <Route path='/signin' element={<LoginPage />} />

                <Route path='/preferences' element={<PrivateRoute element={<Preferences />} />} />

                {/* <Route path='/events' element={<Dashboard />} /> */}

                <Route path="/events" element={<PrivateRoute element={<Events />} />} />
                <Route path="/booking" element={<PrivateRoute element={<Booking />}  />} />
                <Route path="/availability" element={<PrivateRoute element={<Availability />}  />} />
                <Route path="/settings" element={<PrivateRoute element={<Setting />}  />} />
                <Route path="/createEvent" element={<PrivateRoute element={<CreateEvent />}  />} />

                <Route path="/createEvent/:eventId" element={<PrivateRoute element={<CreateEvent />} />} />

              </Routes>
              <Toaster />
            </BrowserRouter>
          </AvailabilityProvider>
        </BookEventProvider>
      </EventProvider>

    </>
  )
}

export default App
