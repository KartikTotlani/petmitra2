import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        console.log("Fetching appointments...");
        const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Appointments fetched:", data);

        if (data.success && Array.isArray(data.appointments)) {
          setAppointments(data.appointments);
        } else {
          setAppointments([]);
          setError('Unexpected response from server.');
        }
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError('Failed to load appointments.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [token]);

  const handleCancelAppointment = async (appointmentId) => {
    try {
      // This assumes you have a cancel/delete API route; update accordingly
      await axios.delete(`${backendUrl}/api/user/appointments/${appointmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Appointment cancelled');
      setAppointments((prev) => prev.filter((appt) => appt._id !== appointmentId));
    } catch (err) {
      console.error(err);
      toast.error('Failed to cancel appointment');
    }
  };

  if (loading) return <div className="text-center mt-6">Loading appointments...</div>;
  if (error) return <div className="text-center text-red-500 mt-6">Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">My Appointments</h2>

      {appointments.length === 0 ? (
        <div className="text-center text-gray-600">You have no upcoming appointments.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {appointments.map((appointment) => (
            <div key={appointment._id} className="bg-white p-6 rounded-lg shadow-md border">
              <h3 className="text-xl font-semibold">
                {appointment.doctor.name || 'Doctor'}
              </h3>
              <p className="text-gray-500 mb-1">
                Specialty: {appointment.doctor.speciality || 'N/A'}
              </p>
              <p className="text-gray-600 mb-1">
                📅 Date: {new Date(appointment.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-1">🕒 Time: {appointment.time}</p>
              <p className="text-sm text-gray-700">Status: {appointment.status}</p>

              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => handleCancelAppointment(appointment._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => navigate(`/appointment/${appointment._id}`)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
