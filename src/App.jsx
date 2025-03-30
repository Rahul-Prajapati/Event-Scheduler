import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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


function App() {

  return (
    <>
      <EventProvider>
        <BookEventProvider>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage />} />

            <Route path='/signup' element={<SignupPage />} />

            <Route path='/signin' element={<LoginPage />} />

            <Route path='/preferences' element={<Preferences />} />

            <Route path='/events' element={<Dashboard />} />

            <Route path="/events" element={<Events />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/availability" element={<Availability />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/createEvent" element={<CreateEvent />} />

            <Route path="/createEvent/:eventId" element={<CreateEvent />} />

          </Routes>
          <Toaster />
        </BrowserRouter>
        </BookEventProvider>
        </EventProvider>
      
    </>
  )
}

export default App
