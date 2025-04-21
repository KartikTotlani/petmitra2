import React, { useEffect, useState, useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const AllAppointments = () => {
  const { backendUrl, aToken } = useContext(AdminContext)
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/admin/get-appointments`, {
          headers: { aToken },
        })

        if (data.success) {
          setAppointments(data.data)
        } else {
          toast.error(data.message || "Failed to fetch appointments")
        }
      } catch (err) {
        console.error(err)
        toast.error("Something went wrong!")
      }
    }

    fetchAppointments()
  }, [backendUrl, aToken])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
  <h2 className="text-3xl font-bold text-primary mb-8 text-center">All Appointments</h2>

  <div className="overflow-x-auto bg-white rounded-lg shadow-md">
    <table className="min-w-full table-auto border border-gray-200">
      <thead className="bg-primary text-white">
        <tr>
          <th className="px-6 py-3 text-left text-sm font-semibold border-r border-white">#</th>
          <th className="px-6 py-3 text-left text-sm font-semibold border-r border-white">Patient</th>
          <th className="px-6 py-3 text-left text-sm font-semibold border-r border-white">Doctor</th>
          <th className="px-6 py-3 text-left text-sm font-semibold border-r border-white">Date</th>
          <th className="px-6 py-3 text-left text-sm font-semibold border-r border-white">Time</th>
          <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {appointments.length === 0 ? (
          <>
            <tr className="border-t text-gray-400 italic">
              <td className="px-6 py-4 border-r">1</td>
              <td className="px-6 py-4 border-r">John Doe</td>
              <td className="px-6 py-4 border-r">Dr. Jane Smith</td>
              <td className="px-6 py-4 border-r">2025-04-22</td>
              <td className="px-6 py-4 border-r">14:30</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-600">
                  pending
                </span>
              </td>
            </tr>
            <tr className="border-t text-gray-400 italic">
              <td className="px-6 py-4 border-r">2</td>
              <td className="px-6 py-4 border-r">Alice Ray</td>
              <td className="px-6 py-4 border-r">Dr. Mark Wayne</td>
              <td className="px-6 py-4 border-r">2025-04-25</td>
              <td className="px-6 py-4 border-r">10:00</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-600">
                  confirmed
                </span>
              </td>
            </tr>
            <tr>
              <td colSpan="6" className="px-6 py-6 text-center text-gray-400 italic">
                No actual appointments found. This is sample data.
              </td>
            </tr>
          </>
        ) : (
          appointments.map((appt, index) => (
            <tr key={appt._id} className="hover:bg-gray-50 border-t">
              <td className="px-6 py-4 border-r">{index + 1}</td>
              <td className="px-6 py-4 border-r">{appt.user?.name || 'User'}</td>
              <td className="px-6 py-4 border-r">{appt.doctor?.name || 'Doctor'}</td>
              <td className="px-6 py-4 border-r">
                {new Date(appt.date).toISOString().split('T')[0]}
              </td>
              <td className="px-6 py-4 border-r">{appt.time || '--'}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    appt.status === 'confirmed'
                      ? 'bg-green-100 text-green-600'
                      : appt.status === 'cancelled'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-yellow-100 text-yellow-600'
                  }`}
                >
                  {appt.status || 'pending'}
                </span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>

  )
}

export default AllAppointments
