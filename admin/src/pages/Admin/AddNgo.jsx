import React, { useState, useContext } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const AddNgo = () => {
  const [ngoImage, setNgoImage] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  //const [location, setLocation] = useState('')
  const [address, setAddress] = useState({ line1: '', line2: '' })

  //const [about, setAbout] = useState('')
  const [phone, setPhone] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const { backendUrl, aToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    if (!ngoImage) {
      return toast.error("Please upload an NGO logo")
    }

    try {
      const formData = new FormData()
      formData.append('image', ngoImage)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      //formData.append('location', location)
      //formData.append('about', about)
      //formData.append('address', address)
      formData.append('address', JSON.stringify(address))

      formData.append('phone', "0000000000")

      console.log("FormData:", formData)
      console.log("Token:", aToken)

      const { data } = await axios.post(`${backendUrl}/api/admin/add-ngo`, formData, {
        headers: { aToken },
      })

      if (data.success) {
        toast.success("NGO added successfully!")
        setNgoImage(false)
        setName('')
        setEmail('')
        setPassword('')
        setAddress('')
        setPhone('')
        ///setLocation('')
        //setAbout('')
      } else {
        toast.error(data.message || "Something went wrong")
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to add NGO. Please try again.")
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="max-w-5xl mx-auto px-4 py-8">
      <p className="text-3xl font-semibold text-center text-primary mb-6">Add NGO</p>

      {/* Upload Area */}
      <div className="flex flex-col items-center gap-2 mb-8">
        <label htmlFor="ngo-img" className="cursor-pointer">
          <img
            src={ngoImage ? URL.createObjectURL(ngoImage) : assets.upload_area}
            alt="Upload NGO"
            className="w-32 h-32 object-contain border rounded-lg p-2 shadow-md"
          />
        </label>
        <input
          onChange={(e) => setNgoImage(e.target.files[0])}
          type="file"
          id="ngo-img"
          hidden
        />
        <p className="text-sm text-gray-600 text-center">Upload NGO <br /> Logo</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <p className="mb-1 font-medium">NGO Name</p>
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
            <p className="mb-1 font-medium">NGO Email</p>
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
        </div>

        {/* Right Column */}{/*}
        <div className="space-y-4">
          <div>
            <p className="mb-1 font-medium">Address</p>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>*/}
      </div>

      <div>
  <p className="mb-1 font-medium">Address Line 1</p>
  <input
    type="text"
    placeholder="Address Line 1"
    value={address.line1}
    onChange={(e) => setAddress({ ...address, line1: e.target.value })}
    className="w-full p-2 border rounded-md"
    required
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


      {/* Phone NGO */}
      <div className="mt-6">
  <p className="mb-1 font-medium">Contact Details of the NGO</p>
  <input
    type="tel"
    placeholder="Phone number of the NGO"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    className="w-full p-2 border rounded-md"
    required
  />
</div>


      {/* Submit Button */}
      <div className="text-center mt-6">
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-md transition duration-300"
        >
          Add NGO
        </button>
      </div>
    </form>
  )
}

export default AddNgo
