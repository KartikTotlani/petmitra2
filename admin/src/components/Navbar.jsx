import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { assets } from '../assets/assets';  // Assuming this is where the logo is stored
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
    const { aToken, setAToken } = useContext(AdminContext);

    const navigate = useNavigate()

    const logout =() =>{
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
    }

    return (
        <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
            <div className="flex items-center gap-2 text-xs">
                <img src={assets.admin_logo} alt="Logo" className="w-36 sm:w-40 cursor-pointer" />
                <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">{aToken ? 'Admin' : 'Doctor'}</p>
            </div>
            <button onClick={logout}
                className="bg-red-600 text-white text-sm px-10 py-2 rounded-full hover:bg-red-700 transition duration-300 ease-in-out"
            >
                Logout
            </button>
        </div>
    );
};

export default Navbar;
