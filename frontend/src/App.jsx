import React from 'react'
import './index.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import About from './pages/About';
import MyAppointments from './pages/MyAppointments';
import AI_help from './pages/AI_help';
import Contacts from './pages/Contacts';
import NGO from './pages/NGO';
import MyProfile from './pages/MyProfile';
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookAppointment from './pages/BookAppointment';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/ai_help' element={<AI_help />} />
        <Route path='/contacts' element={<Contacts />} />
        <Route path='/ngo' element={<NGO />} />
        <Route path='/register' element={<Register />} />
        <Route path="/doctor/:id/book" element={
  localStorage.getItem("token") ? <BookAppointment /> : <Navigate to={`/login?redirect=/doctor/${doctorId}/book`} />
} />



      </Routes>
      {/* ToastContainer for notifications */}
      <ToastContainer />
    </div>
  )
}

export default App