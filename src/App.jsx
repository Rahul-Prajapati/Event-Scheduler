import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import LandingPage from './pages/Landing/LandingPage'
import LoginPage from './pages/Login/LoginPage'
import Preferences from './pages/Preferences/Preferences'
import SignupPage from './pages/SignUp/SignupPage'

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage />} />

            <Route path='/signup' element={<SignupPage />} />

            <Route path='/signin' element={<LoginPage />} />

            <Route path='/preferences' element={<Preferences />} />

            <Route path='/dashboard' element={<Dashboard />} />

          </Routes>
        </BrowserRouter>
      
    </>
  )
}

export default App
