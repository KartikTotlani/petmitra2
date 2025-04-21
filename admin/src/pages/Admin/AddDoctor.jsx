import React, { useState, useContext } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify' 
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const AddDoctor = () => {
  const [docImage, setDocImage] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [speciality, setSpeciality] = useState('General Vet')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [about, setAbout] = useState('')
  const [showPassword, setShowPassword] = useState(false);

  const {backendUrl, aToken }= useContext(AdminContext)

  const onSubmitHandler = async(event) => {
    event.preventDefault()
    if (!docImage) {
        return toast.error("Please upload a doctor's picture")
    }

    try {
        const formData = new FormData()
        formData.append('image', docImage)
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('experience', experience)
        formData.append('fees', Number(fees))
        formData.append('speciality', speciality)
        formData.append('degree', degree)
        formData.append('address', JSON.stringify({line1:address1,line2:address2}))
        formData.append('about', about)

        console.log('FormData:', formData);
        console.log("Token:", aToken);


        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
          }

        const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: {aToken}})

          console.log("API Response: ", data);
  
        if (data.success) {
          toast.success("Doctor added successfully!")
          // Optional: Reset form
          setDocImage(false)
          setName('')
          setEmail('')
          setPassword('')
          setExperience('1 Year')
          setFees('')
          setSpeciality('General Vet')
          setDegree('')
          setAddress1('')
          setAddress2('')
          setAbout('')
        } else {
            console.log("Error response from API: ", data.message);
          toast.error(data.message || "Something went wrong")
        }
      } catch (error) {
        console.error(error)
        toast.error("Failed to add doctor. Please try again.")
      }
    }

  return (
    <form onSubmit={onSubmitHandler} className="max-w-5xl mx-auto px-4 py-8">
      <p className="text-3xl font-semibold text-center text-primary mb-6">Add Doctor</p>

      {/* Upload Area */}
      <div className="flex flex-col items-center gap-2 mb-8">
        <label htmlFor="doc-img" className="cursor-pointer">
          <img
            src={docImage ? URL.createObjectURL(docImage) : assets.upload_area}
            alt="Upload Doctor"
            className="w-32 h-32 object-contain border rounded-lg p-2 shadow-md"
          />
        </label>
        <input
          onChange={(e) => setDocImage(e.target.files[0])}
          type="file"
          id="doc-img"
          hidden
        />
        <p className="text-sm text-gray-600 text-center">Upload Doctor <br /> Picture</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <p className="mb-1 font-medium">Doctor Name</p>
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
            <p className="mb-1 font-medium">Doctor Email</p>
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
  <p className="mb-1 font-medium">Doctor Password</p>
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
            <p className="mb-1 font-medium">Experience</p>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            >
              <option disabled>Select experience</option>
              {[...Array(10)].map((_, i) => (
                <option key={i} value={`${i + 1} Year`}>{i + 1} Year</option>
              ))}
              <option value="10+ Year">10+ Year</option>
            </select>
          </div>
          <div>
            <p className="mb-1 font-medium">Fees</p>
            <input
              type="number"
              placeholder="Fees"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <p className="mb-1 font-medium">Speciality</p>
            <select
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            >
              <option disabled>Select Speciality</option>
              <option value="General Vet">General Vet</option>
              <option value="Veterinary Surgeon">Veterinary Surgeon</option>
              <option value="Veterinary Dermatologist">Veterinary Dermatologist</option>
              <option value="Veterinary Dentist">Veterinary Dentist</option>
              <option value="Veterinary Cardiologist">Veterinary Cardiologist</option>
            </select>
          </div>
          <div>
            <p className="mb-1 font-medium">Degree</p>
            <input
              type="text"
              placeholder="Degree"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <p className="mb-1 font-medium">Address</p>
            <input
              type="text"
              placeholder="Address 1"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className="w-full p-2 border rounded-md mb-2"
              required
            />
            <input
              type="text"
              placeholder="Address 2"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>
      </div>

      {/* About Doctor */}
      <div className="mt-6">
        <p className="mb-1 font-medium">About Doctor</p>
        <textarea
          placeholder="Write about doctor"
          rows={5}
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="w-full p-3 border rounded-md resize-none"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="text-center mt-6">
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-md transition duration-300"
        >
          Add Doctor
        </button>
      </div>
    </form>
  )
}

export default AddDoctor
