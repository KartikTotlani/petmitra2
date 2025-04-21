import React, { useState, useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast for notifications

const Login = () => {
    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setAToken, backendUrl } = useContext(AdminContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if (state === 'Admin') {
                // Make the POST request
                const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });

                // Check if login is successful
                if (data.success) {
                    // Store the token in localStorage (but avoid logging it directly)
                    localStorage.setItem('aToken', data.token); // Assuming 'data.token' is the correct key for the token

                    // Set the token in context
                    setAToken(data.token);

                    // Show success notification using toast
                    toast.success('Login successful!');
                } else {
                    // If login fails, show error message
                    toast.error('Login failed: ' + data.message);
                }
            } else {
                // Handle doctor login if needed
            }
        } catch (error) {
            // Handle any unexpected errors
            console.error("Error during login:", error);
            toast.error('An error occurred during login. Please try again.');
        }
    };

    return (
        <form className='min-h-[80vh] flex items-center' onSubmit={onSubmitHandler}>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-x1 text-[#5E5E5E] text-sm shadow-lg'>
                <p className='text-2xl font-semibold m-auto'>
                    <span className='text-primary'>{state}</span> Login
                </p>
                <div className='w-full'>
                    <p>Email</p>
                    <input 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email} 
                        className='border border-[#DADADA] rounded w-full p-2 mt-1' 
                        type='email' 
                        required
                    />
                </div>

                <div className='w-full'>
                    <p>Password</p>
                    <input 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password} 
                        className='border border-[#DADADA] rounded w-full p-2 mt-1' 
                        type='password' 
                        required
                    />
                </div>

                <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
                {
                    state === 'Admin' 
                        ? <p>Doctor Login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Doctor')}>Click Here</span></p>
                        : <p>Admin Login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Admin')}>Click Here</span></p>
                }
            </div>
        </form>
    );
};

export default Login;
