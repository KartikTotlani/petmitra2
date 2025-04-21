import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch doctors data from the backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get('/api/doctors'); // Update with your API endpoint
        if (data.success) {
          setDoctors(data.data);
        } else {
          console.log('Failed to fetch doctors');
        }
      } catch (err) {
        console.error('Error fetching doctors:', err);
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
      <h1 className="text-3xl font-semibold text-center text-primary mb-6">Doctors List</h1>

      {/* Doctors List */}
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
              <p className="text-gray-500 mb-4">{doctor.experience} years of experience</p>

              <div className="flex items-center justify-between">
                <Link
                  to={`/doctor/${doctor._id}`}
                  className="text-primary font-medium hover:text-primary-dark"
                >
                  View Details
                </Link>
                <Link
                  to={`/doctor/edit/${doctor._id}`}
                  className="text-orange-600 font-medium hover:text-orange-800"
                >
                  Edit
                </Link>
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

export default DoctorsList;
