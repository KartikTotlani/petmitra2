import React, {useContext} from 'react'
import './index.css'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure this CSS is imported
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import {Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import AddNgo from './pages/Admin/AddNgo';
import NgoList from './pages/Admin/NgoList';
import AddUser from './pages/Admin/AddUser' 
import UserList from './pages/Admin/UserList'

const App = () => {

  const {aToken} = useContext(AdminContext)

  return aToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard/>} />
          <Route path='/all-appointments' element={<AllAppointments/>} />
          <Route path='/add-doctors' element={<AddDoctor/>} />
          <Route path='/doctors-list' element={<DoctorsList/>} />
          <Route path='/add-ngo' element={<AddNgo />} />
          <Route path='/ngo-list' element={<NgoList />} />
          <Route path='/add-user' element={<AddUser />} />
          <Route path='/user-list' element={<UserList />} />
        </Routes>
      </div>
    </div>
  ):(
    <>
      <Login/>
      <ToastContainer/>
    </>
  )
}

export default App