import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token"); // Auth check from localStorage

  // Fetch doctor data from the backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/doctors`);
        if (data.success) {
          setDoctors(data.data);
        } else {
          toast.error('Failed to fetch doctors');
        }
      } catch (err) {
        console.error('Error fetching doctors:', err);
        toast.error('Error fetching doctors');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-gray-600">Loading Doctors...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center text-primary mb-6">Our Doctors</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div key={doctor._id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <img
                className="w-full h-48 object-cover rounded-lg mb-4"
                src={doctor.image ? doctor.image : assets.default_doctor_image}
                alt={doctor.name}
              />
              <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
              <p className="text-gray-600 mb-2">{doctor.speciality}</p>
              <p className="text-gray-500 mb-1">{doctor.experience} years of experience</p>
              <p className="text-gray-500 mb-4">Fees: ₹{doctor.fees}</p>

              {/* Displaying doctor details directly */}
              <div className="flex justify-between items-center mt-4">
                {isLoggedIn ? (
                  <Link
                    to={`/doctor/${doctor._id}/book`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Book Appointment
                  </Link>
                ) : (
                  <button
                    onClick={() =>
                      navigate(`/login?redirect=/doctor/${doctor._id}/book`)
                    }
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                  >
                    Login to Book
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center">
            <p className="text-lg font-medium text-gray-500">No doctors available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
