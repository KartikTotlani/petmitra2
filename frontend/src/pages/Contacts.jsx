import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'

const Contacts = () => {
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target
    setContactInfo({ ...contactInfo, [name]: value })
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post('/api/contacts', contactInfo) // Replace with your actual contact API endpoint
      if (data.success) {
        setResponseMessage('Your message has been sent successfully!')
        setContactInfo({
          name: '',
          email: '',
          message: '',
        })
      } else {
        setResponseMessage('There was an error sending your message. Please try again.')
      }
    } catch (err) {
      console.error("Error sending contact message:", err)
      setResponseMessage('There was an error sending your message. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center text-primary mb-6">Contact Us</h1>

      {/* Contact Form */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold text-primary mb-4">Send us a Message</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={contactInfo.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={contactInfo.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-gray-600 font-medium mb-2">Your Message</label>
              <textarea
                name="message"
                value={contactInfo.message}
                onChange={handleChange}
                rows="5"
                placeholder="Write your message here"
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
                {loading ? 'Sending Message...' : 'Send Message'}
              </button>
            </div>
          </div>
        </form>

        {/* Response message */}
        {responseMessage && (
          <div className="mt-6 text-center text-lg font-medium text-gray-800">
            {responseMessage}
          </div>
        )}
      </div>

      {/* Contact Info */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-primary mb-4">Our Contact Information</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <img className="w-6 mr-3" src={assets.arrow_icon} alt="Phone" />
            <span className="text-lg text-gray-800">+91 9665699568</span>
          </div>
          <div className="flex items-center">
            <img className="w-6 mr-3" src={assets.verified_icon} alt="Email" />
            <span className="text-lg text-green-800">support@petmitra.com</span>
          </div>
          <div className="flex items-center">
            <img className="w-6 mr-3" src={assets.arrow_icon} alt="Location" />
            <span className="text-lg text-gray-800">123, Information Technology Dept, Pimpri Chinchwad College of Engineering, Pune, India</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacts
