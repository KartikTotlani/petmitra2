import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { assets } from '../assets/assets';

const NGO = () => {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch NGO data from backend
  useEffect(() => {
    const fetchNgos = async () => {
      try {
        // Assuming backend URL is correctly defined in `backendUrl`
        const url = `${backendUrl}/api/ngos/get-ngos`;
        console.log("Requesting data from:", url);

        const { data } = await axios.get(url);
        console.log("Fetched data:", data);

        if (data.success) {
          setNgos(data.data);
        } else {
          console.log('Failed to fetch NGOs');
        }
      } catch (err) {
        console.error('Error fetching NGOs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNgos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-gray-600">Loading NGOs...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center text-primary mb-6">Our NGOs</h1>

      {/* NGOs List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ngos.length > 0 ? (
          ngos.map((ngo) => (
            <div key={ngo._id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <img
                className="w-full h-48 object-cover rounded-lg mb-4"
                src={ngo.image ? ngo.image : assets.default_ngo_image} // Use a default image if NGO doesn't have one
                alt={ngo.name}
              />
              <h3 className="text-xl font-semibold text-gray-800">{ngo.name}</h3>
              {/* Displaying Address if present */}
              <p className="text-gray-600 mb-2">
                {ngo.address ? `${ngo.address.line1}, ${ngo.address.line2}` : 'Address not available'}
              </p>
              <p className="text-gray-500 mb-2">{ngo.phone}</p>
              <p className="text-gray-500 mb-4">{ngo.email}</p> {/* Displaying email */}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center">
            <p className="text-lg font-medium text-gray-500">No NGOs available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NGO;
