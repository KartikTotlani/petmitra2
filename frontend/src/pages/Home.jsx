import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import SpecialityMenu from '../components/SpecialityMenu';
import DoctorsList from '../components/DoctorsList'; // Assuming you want to display a list of doctors
import { assets } from '../assets/assets';
import axios from 'axios';

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // To track errors

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get('/api/doctors');  // Replace with the correct API endpoint
        
        console.log('API Response:', data);  // Log the response to check its structure
        
        if (Array.isArray(data)) {
          setDoctors(data); // If it's an array, set it to the state
        } else {
          console.error('Unexpected response format:', data);
          setDoctors([]); // Set an empty array if the response is not in expected format
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Failed to load doctors.");
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <SpecialityMenu />

      {/* Featured Doctors Section */}
      <section className="mt-12 px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">Featured Doctors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="text-center">Loading doctors...</div>
          ) : (
            doctors.map((doctor) => (
              <div key={doctor.id} className="bg-white p-4 rounded-lg shadow-md">
                <img
                  src={assets.appointment_img || assets.profile_pic} // Replace with correct image URL
                  alt={doctor.name}
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-center">{doctor.name}</h3>
                <p className="text-center text-gray-600">{doctor.speciality}</p>
                <div className="text-center mt-4">
                  <a href={`/appointment/${doctor.id}`} className="bg-primary text-white px-6 py-2 rounded-full">Book Appointment</a>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Popular Specialities Section */}
      <section className="mt-12 px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">Popular Specialities</h2>
        <div className="flex justify-center space-x-6">
          <div className="bg-primary text-white py-4 px-8 rounded-full cursor-pointer">
            <p>General Vet</p>
          </div>
          <div className="bg-primary text-white py-4 px-8 rounded-full cursor-pointer">
            <p>Veterinary Cardiology</p>
          </div>
          <div className="bg-primary text-white py-4 px-8 rounded-full cursor-pointer">
            <p>Veterinary Dermatology</p>
          </div>
        </div>
      </section>

      {/* Doctors List */}
      <section className="mt-12 px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">All Doctors</h2>
        <DoctorsList doctors={doctors} />
      </section>

      {/* Call to Action Section */}
      <section className="bg-gray-100 py-16 mt-16 text-center">
        <h3 className="text-2xl font-semibold mb-4">Join Us Today!</h3>
        <p className="text-lg mb-6">Become a part of our growing community of healthcare professionals.</p>
        <a href="/register" className="bg-primary text-white py-2 px-8 rounded-full">Sign Up Now</a>
      </section>
    </div>
  );
};

export default Home;
