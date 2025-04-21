import React, { useState, useContext } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const AddUser = () => {
  const [userImage, setUserImage] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState({ line1: '', line2: '' })
  const [phone, setPhone] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [gender, setGender] = useState('Not Selected')
  const [dob, setDob] = useState('')

  const { backendUrl, aToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    if (!userImage) return toast.error("Please upload a user profile image")

    try {
      const formData = new FormData()
      formData.append('image', userImage)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('address', JSON.stringify(address))
      formData.append('phone', phone || "0000000000")
      formData.append('gender', gender || "Not Selected")
      formData.append('dob', dob || null)
      
      const { data } = await axios.post(`${backendUrl}/api/admin/add-user`, formData, {
        headers: { aToken },
      })

      if (data.success) {
        toast.success("User added successfully!")
        setUserImage(null)
        setName('')
        setEmail('')
        setPassword('')
        setAddress({ line1: '', line2: '' })
        setPhone('')
        setGender('Not Selected')
        setDob('')
      } else {
        toast.error(data.message || "Something went wrong")
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to add user. Please try again.")
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="max-w-5xl mx-auto px-4 py-8">
      <p className="text-3xl font-semibold text-center text-primary mb-6">Add User</p>

      <div className="flex flex-col items-center gap-2 mb-8">
        <label htmlFor="user-img" className="cursor-pointer">
          <img
            src={userImage ? URL.createObjectURL(userImage) : assets.upload_area}
            alt="Upload User"
            className="w-32 h-32 object-contain border rounded-lg p-2 shadow-md"
          />
        </label>
        <input
          onChange={(e) => setUserImage(e.target.files[0])}
          type="file"
          id="user-img"
          hidden
        />
        <p className="text-sm text-gray-600 text-center">Upload User Profile Image</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <p className="mb-1 font-medium">Name</p>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <p className="mb-1 font-medium">Email</p>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="relative">
            <p className="mb-1 font-medium">Password</p>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 pr-10 border rounded-md"
              required
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

        <div>
            <p className="mb-1 font-medium">Date of Birth</p>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <p className="mb-1 font-medium">Gender</p>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="Not Selected">Not Selected</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="mb-1 font-medium">Address Line 1</p>
            <input
              type="text"
              placeholder="Address Line 1"
              value={address.line1}
              onChange={(e) => setAddress({ ...address, line1: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <p className="mb-1 font-medium">Address Line 2</p>
            <input
              type="text"
              placeholder="Address Line 2"
              value={address.line2}
              onChange={(e) => setAddress({ ...address, line2: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-1 font-medium">Phone Number</p>
        <input
          type="text"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="text-center mt-6">
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-md transition duration-300"
        >
          Add User
        </button>
      </div>
    </form>
  )
}

export default AddUser
