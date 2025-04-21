import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'

const Appointment = () => {
  const [appointments, setAppointments] = useState([])
  const [newAppointment, setNewAppointment] = useState({
    doctorId: '',
    userId: '',
    date: '',
    time: '',
    reason: '',
  })
  const [loading, setLoading] = useState(false)

  // Fetch all appointments
  const fetchAppointments = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get('/api/appointments') // Replace with your actual endpoint
      setAppointments(data.appointments || [])
    } catch (err) {
      console.error("Error fetching appointments:", err)
    }
    setLoading(false)
  }

  // Handle new appointment form submission
  const handleNewAppointment = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data } = await axios.post('/api/appointments', newAppointment) // Replace with your actual endpoint
      if (data.success) {
        fetchAppointments()
        setNewAppointment({
          doctorId: '',
          userId: '',
          date: '',
          time: '',
          reason: '',
        })
      } else {
        console.error("Failed to create appointment:", data.message)
      }
    } catch (err) {
      console.error("Error creating appointment:", err)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center text-primary mb-6">Manage Appointments</h1>

      {/* New Appointment Form */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-primary mb-4">Create New Appointment</h2>
        <form onSubmit={handleNewAppointment} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-600 font-medium mb-2">Doctor</label>
            <select
              value={newAppointment.doctorId}
              onChange={(e) => setNewAppointment({ ...newAppointment, doctorId: e.target.value })}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="" disabled>Select Doctor</option>
              {/* Replace these options with your actual doctors */}
              <option value="1">Dr. John Doe</option>
              <option value="2">Dr. Jane Smith</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-2">User</label>
            <select
              value={newAppointment.userId}
              onChange={(e) => setNewAppointment({ ...newAppointment, userId: e.target.value })}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="" disabled>Select User</option>
              {/* Replace these options with your actual users */}
              <option value="1">User A</option>
              <option value="2">User B</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-2">Date</label>
            <input
              type="date"
              value={newAppointment.date}
              onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-2">Time</label>
            <input
              type="time"
              value={newAppointment.time}
              onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-600 font-medium mb-2">Reason for Appointment</label>
            <textarea
              value={newAppointment.reason}
              onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
              placeholder="Describe the reason for the appointment"
              rows="4"
              className="w-full p-3 border rounded-md resize-none"
              required
            />
          </div>

          <div className="col-span-2 text-center mt-4">
            <button
              type="submit"
              className="bg-primary text-white py-2 px-6 rounded-md"
              disabled={loading}
            >
              {loading ? 'Creating Appointment...' : 'Create Appointment'}
            </button>
          </div>
        </form>
      </div>

      {/* Appointments List */}
      <div>
        <h2 className="text-xl font-semibold text-primary mb-4">Upcoming Appointments</h2>
        {loading ? (
          <p className="text-center">Loading appointments...</p>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left">Doctor</th>
                <th className="px-6 py-3 text-left">User</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Time</th>
                <th className="px-6 py-3 text-left">Reason</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b">
                    <td className="px-6 py-3">{appointment.doctorName}</td>
                    <td className="px-6 py-3">{appointment.userName}</td>
                    <td className="px-6 py-3">{appointment.date}</td>
                    <td className="px-6 py-3">{appointment.time}</td>
                    <td className="px-6 py-3">{appointment.reason}</td>
                    <td className="px-6 py-3">
                      <button className="text-red-600" onClick={() => handleCancelAppointment(appointment.id)}>
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">No appointments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )

  // Cancel Appointment
  const handleCancelAppointment = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      setLoading(true)
      try {
        const { data } = await axios.delete(`/api/appointments/${appointmentId}`) // Replace with actual API call
        if (data.success) {
          fetchAppointments() // Refresh the list of appointments
        }
      } catch (err) {
        console.error("Error canceling appointment:", err)
      }
      setLoading(false)
    }
  }
}

export default Appointment
