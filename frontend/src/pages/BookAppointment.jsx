import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const BookAppointment = () => {
  const { id: doctorId } = useParams(); // Get doctor ID from route
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [reason, setReason] = useState('');
  const [isBooked, setIsBooked] = useState(false); // Success state
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('token');

  const timeSlots = [
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
    '04:00 PM - 05:00 PM',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error('You need to be logged in to book an appointment.');
      navigate('/login');
      return;
    }

    if (!date || !timeSlot) {
      toast.error('Please select both date and time slot.');
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/user/appointments`,
        {
          doctorId,
          date,
          timeSlot,
          reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success('Appointment booked successfully!');
        setIsBooked(true); // Show confirmation section
        // Reset form
        setDate('');
        setTimeSlot('');
        setReason('');
      } else {
        toast.error(response.data.message || 'Failed to book appointment.');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error('Something went wrong while booking the appointment. Please try again later.');
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      {isBooked ? (
        <div className="bg-green-100 border border-green-300 text-green-800 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold mb-4">🎉 Appointment Booked!</h2>
          <p className="mb-2">Your appointment has been scheduled successfully.</p>
          <p className="mb-2 font-medium">📅 {date} | 🕒 {timeSlot}</p>
          <button
            onClick={() => navigate('/my-appointments')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            View My Appointments
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-center">Book Appointment</h2>
          <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded-lg p-6 border">
            <div>
              <label className="block font-medium mb-1">Date:</label>
              <input
                type="date"
                className="w-full border border-gray-300 px-3 py-2 rounded"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Time Slot:</label>
              <select
                className="w-full border border-gray-300 px-3 py-2 rounded"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                required
              >
                <option value="">Select a time slot</option>
                {timeSlots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">Reason (optional):</label>
              <textarea
                className="w-full border border-gray-300 px-3 py-2 rounded"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows="3"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Book Appointment
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default BookAppointment;
