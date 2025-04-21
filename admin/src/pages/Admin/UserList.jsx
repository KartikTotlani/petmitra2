import React, { useEffect, useState, useContext } from "react"
import { AdminContext } from "../../context/AdminContext"
import axios from "axios"
import { toast } from "react-toastify"

const UserList = () => {
  const { backendUrl, aToken } = useContext(AdminContext)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/get-users`, {
        headers: { aToken },
      })
      if (data.success) {
        setUsers(data.data)
      } else {
        toast.error(data.message || "Failed to load users")
      }
    } catch (error) {
      toast.error("Error fetching users")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return
    try {
      const { data } = await axios.delete(`${backendUrl}/api/admin/delete-user/${id}`, {
        headers: { aToken },
      })
      if (data.success) {
        toast.success("User deleted")
        setUsers(prev => prev.filter(user => user._id !== id))
      } else {
        toast.error(data.message || "Failed to delete user")
      }
    } catch (error) {
      toast.error("Error deleting user")
      console.error(error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  if (loading) {
    return <p className="text-center mt-10 text-lg text-gray-600">Loading Users...</p>
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center text-primary mb-6">Users List</h2>
      {users.length === 0 ? (
        <p className="text-center text-gray-600">No users found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={user.image}
                alt={user.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>

              <p className="mt-1">
                <span className="font-medium">Address:</span>{" "}
                {[user.address?.line1, user.address?.line2].filter(Boolean).join(", ")}
              </p>

              <p>
                <span className="font-medium">Phone:</span> {user.phone || "N/A"}
              </p>
              <p>
                <span className="font-medium">Gender:</span> {user.gender || "N/A"}
              </p>
              <p>
                <span className="font-medium">DOB:</span>{" "}
                {user.dob ? new Date(user.dob).toLocaleDateString() : "Not Provided"}
              </p>

              <button
                onClick={() => handleDelete(user._id)}
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

export default UserList
