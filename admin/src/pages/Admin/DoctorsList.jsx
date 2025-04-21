import React, { useEffect, useState, useContext } from "react"
import { AdminContext } from "../../context/AdminContext"
import axios from "axios"
import { toast } from "react-toastify"

const DoctorsList = () => {
  const { backendUrl, aToken } = useContext(AdminContext)
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/get-doctors`, {
        headers: { aToken },
      })
      if (data.success) {
        setDoctors(data.data)
      } else {
        toast.error(data.message || "Failed to load doctors")
      }
    } catch (error) {
      toast.error("Error fetching doctors")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return
    try {
      const { data } = await axios.delete(`${backendUrl}/api/admin/delete-doctor/${id}`, {
        headers: { aToken },
      })
      if (data.success) {
        toast.success("Doctor deleted")
        setDoctors(prev => prev.filter(doc => doc._id !== id))
      } else {
        toast.error(data.message || "Failed to delete doctor")
      }
    } catch (error) {
      toast.error("Error deleting doctor")
      console.error(error)
    }
  }

  useEffect(() => {
    fetchDoctors()
  }, [])

  if (loading) {
    return <p className="text-center mt-10 text-lg text-gray-600">Loading doctors...</p>
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center text-primary mb-6">Doctors List</h2>
      {doctors.length === 0 ? (
        <p className="text-center text-gray-600">No doctors found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <div
              key={doc._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={doc.image}
                alt={doc.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold">{doc.name}</h3>
              <p className="text-sm text-gray-600">{doc.email}</p>
              <p className="mt-1"><span className="font-medium">Speciality:</span> {doc.speciality}</p>
              <p><span className="font-medium">Degree:</span> {doc.degree}</p>
              <p><span className="font-medium">Experience:</span> {doc.experience}</p>
              <p><span className="font-medium">Fees:</span> ₹{doc.fees}</p>
              <button
                onClick={() => handleDelete(doc._id)}
                className="mt-3 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DoctorsList
