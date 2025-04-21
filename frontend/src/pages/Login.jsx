import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets'; // Adjust as per your project structure
import axios from 'axios';


const backendUrl = import.meta.env.VITE_BACKEND_URL;


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validate input fields
    if (!email || !password) {
      return toast.error('Please enter both email and password.');
    }

    setLoading(true);

    try {
      const response = await axios.post(`${backendUrl}/api/login`, { email, password }); // Use the appropriate API URL
      setLoading(false);

      if (response.data.success) {
        // Store the token (assuming the API returns a token)
        localStorage.setItem('token', response.data.token);

        toast.success('Login successful!');
        navigate('/'); // Redirect user to homepage or dashboard
      } else {
        toast.error(response.data.message || 'Login failed.');
      }
    } catch (error) {
      setLoading(false);
      toast.error('An error occurred while logging in. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 mt-4 bg-primary text-white font-semibold rounded-md ${loading ? 'bg-gray-500' : 'hover:bg-primary-dark'}`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Don't have an account? 
            <button
              onClick={() => navigate('/register')} // Navigate to the sign-up page
              className="text-primary font-semibold"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
