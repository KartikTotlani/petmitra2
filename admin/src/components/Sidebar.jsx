import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { assets } from '../assets/assets';
import {NavLink} from 'react-router-dom'


const Sidebar = () => {

    const { aToken, setAToken } = useContext(AdminContext);
    

  return (
    <div className='min-h-screen bg-white border-r'>
        {
            aToken && <ul className='text-[#515151] mt-5'>

                <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to ={'/admin-dashboard'}>
                    <img src={assets.home_icon} alt='' />
                    <p>Dashboard</p>
                </NavLink>

                <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/all-appointments'}>
                    <img src={assets.appointment_icon} alt='' />
                    <p>Appointments</p>
                </NavLink>

                <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/add-doctors'}>
                    <img src={assets.add_icon} alt='' />
                    <p>Add Doctors</p>
                </NavLink>

                <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/doctors-list'}>
                    <img src={assets.people_icon} alt='' />
                    <p>Doctors List</p>
                </NavLink>

                <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/add-ngo'}>
                    <img src={assets.add_icon} alt='' />
                    <p>Add NGOs</p>
                </NavLink>

                <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/ngo-list'}>
                    <img src={assets.people_icon} alt='' />
                    <p>NGO List</p>
                </NavLink>

                <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/add-user'}>
                    <img src={assets.add_icon} alt='' />
                    <p>Add User</p>
                </NavLink>

                <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/user-list'}>
                    <img src={assets.people_icon} alt='' />
                    <p>Users List</p>
                </NavLink>
            </ul>
        }
    </div>
  )
}

export default Sidebar