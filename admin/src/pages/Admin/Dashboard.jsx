import React, { useEffect, useState, useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { FaUserMd, FaUsers, FaCalendarCheck, FaHandsHelping } from 'react-icons/fa'

const Dashboard = () => {
  const { backendUrl, aToken } = useContext(AdminContext)

  const [stats, setStats] = useState({
    doctors: 0,
    users: 0,
    appointments: 0,
    ngos: 0,
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [doctorsRes, usersRes, appointmentsRes, ngosRes] = await Promise.all([
          axios.get(`${backendUrl}/api/admin/get-doctors`, { headers: { aToken } }),
          axios.get(`${backendUrl}/api/admin/get-users`, { headers: { aToken } }),
          axios.get(`${backendUrl}/api/admin/get-appointments`, { headers: { aToken } }),
          axios.get(`${backendUrl}/api/admin/get-ngos`, { headers: { aToken } }),
        ])

        setStats({
          doctors: doctorsRes.data?.data?.length || 0,
          users: usersRes.data?.data?.length || 0,
          appointments: appointmentsRes.data?.data?.length || 0,
          ngos: ngosRes.data?.data?.length || 0,
        })
      } catch (error) {
        console.error("Dashboard fetch error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [backendUrl, aToken])

  const cards = [
    {
      label: 'Total Doctors',
      value: stats.doctors,
      color: 'text-blue-600',
      icon: <FaUserMd className="text-2xl text-blue-500" />,
    },
    {
      label: 'Total Users',
      value: stats.users,
      color: 'text-green-600',
      icon: <FaUsers className="text-2xl text-green-500" />,
    },
    {
      label: 'Appointments',
      value: stats.appointments,
      color: 'text-purple-600',
      icon: <FaCalendarCheck className="text-2xl text-purple-500" />,
    },
    {
      label: 'Total NGOs',
      value: stats.ngos,
      color: 'text-pink-600',
      icon: <FaHandsHelping className="text-2xl text-pink-500" />,
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-primary mb-10 text-center">Admin Dashboard</h2>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading statistics...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col items-start"
            >
              <div className="mb-2">{card.icon}</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">{card.label}</h3>
              <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12">
        <h4 className="text-2xl font-semibold mb-4">Recent Activity (coming soon)</h4>
        <p className="text-gray-500">
          You'll be able to see latest appointments, new users, and registrations here.
        </p>
      </div>
    </div>
  )
}

export default Dashboard
