import React, { useEffect, useState, useContext } from "react"
import { AdminContext } from "../../context/AdminContext"
import axios from "axios"
import { toast } from "react-toastify"

const NgoList = () => {
  const { backendUrl, aToken } = useContext(AdminContext)
  const [ngos, setNgos] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchNgos = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/get-ngos`, {
        headers: { aToken },
      })
      if (data.success) {
        setNgos(data.data)
      } else {
        toast.error(data.message || "Failed to load NGOs")
      }
    } catch (error) {
      toast.error("Error fetching Ngos")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Ngo?")) return
    try {
      const { data } = await axios.delete(`${backendUrl}/api/admin/delete-ngo/${id}`, {
        headers: { aToken },
      })
      if (data.success) {
        toast.success("NGO deleted")
        setNgos(prev => prev.filter(ngo => ngo._id !== id))
      } else {
        toast.error(data.message || "Failed to delete NGO")
      }
    } catch (error) {
      toast.error("Error deleting NGO")
      console.error(error)
    }
  }

  useEffect(() => {
    fetchNgos()
  }, [])

  if (loading) {
    return <p className="text-center mt-10 text-lg text-gray-600">Loading NGOs...</p>
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center text-primary mb-6">NGOs List</h2>
      {ngos.length === 0 ? (
        <p className="text-center text-gray-600">No NGOs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {ngos.map((ngo) => (
            <div
              key={ngo._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={ngo.image}
                alt={ngo.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold">{ngo.name}</h3>
              <p className="text-sm text-gray-600">{ngo.email}</p>
              <p className="mt-1"><span className="font-medium">Address:</span>{" "}{[ngo.address?.line1, ngo.address?.line2].filter(Boolean).join(', ')}</p>
              <p><span className="font-medium">Contact Details:</span> {ngo.phone}</p>
              {/*<p><span className="font-medium">Experience:</span> {ngo.experience}</p>
              <p><span className="font-medium">Fees:</span> ₹{ngo.fees}</p>*/}
              <button
                onClick={() => handleDelete(ngo._id)}
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

export default NgoList
