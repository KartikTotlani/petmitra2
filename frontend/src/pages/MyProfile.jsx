import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const MyProfile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    image: '',
    phone: '',
    gender: 'Not Selected',
    dob: '',
    address: {
      line1: '',
      line2: '',
    },
  });

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const { data } = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (data.success) {
          const user = data.user;
          setProfileData({
            name: user.name || '',
            email: user.email || '',
            image: user.image || '',
            phone: user.phone || '',
            gender: user.gender || 'Not Selected',
            dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
            address: {
              line1: user?.address?.line1 || '',
              line2: user?.address?.line2 || '',
            },
          });
        } else {
          setError('Failed to load profile data.');
          toast.error('Failed to load profile data.');
        }
      } catch (err) {
        console.error(err);
        setError('Error fetching profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData();
    formData.append('name', profileData.name);
    formData.append('phone', profileData.phone);
    formData.append('gender', profileData.gender);
    formData.append('dob', profileData.dob);
    formData.append('address[line1]', profileData.address.line1);
    formData.append('address[line2]', profileData.address.line2);
    if (newImage) formData.append('image', newImage);

    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.put(`${backendUrl}/api/user/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data.success) {
        setProfileData((prev) => ({
          ...prev,
          image: newImage ? URL.createObjectURL(newImage) : prev.image,
        }));
        toast.success('Profile updated successfully');
        setIsEditing(false);
      } else {
        setError('Failed to save changes.');
        toast.error('Failed to save changes.');
      }
    } catch (err) {
      console.error(err);
      setError('Error saving profile data.');
      toast.error('Error saving profile data.');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">My Profile</h2>

      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 rounded-full border-4 border-primary overflow-hidden">
          <img
            src={newImage ? URL.createObjectURL(newImage) : profileData.image || assets.profile_pic}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <form onSubmit={handleSave} className="max-w-lg mx-auto">
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            value={profileData.name}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            className="w-full p-2 border rounded-md"
            disabled={!isEditing}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            value={profileData.email}
            className="w-full p-2 border rounded-md bg-gray-100"
            disabled
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Phone</label>
          <input
            type="text"
            value={profileData.phone}
            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
            className="w-full p-2 border rounded-md"
            disabled={!isEditing}
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Gender</label>
          <select
            value={profileData.gender}
            onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
            className="w-full p-2 border rounded-md"
            disabled={!isEditing}
          >
            <option value="Not Selected">Not Selected</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Date of Birth</label>
          <input
            type="date"
            value={profileData.dob}
            onChange={(e) => setProfileData({ ...profileData, dob: e.target.value })}
            className="w-full p-2 border rounded-md"
            disabled={!isEditing}
          />
        </div>

        {/* Address Line 1 */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Address Line 1</label>
          <input
            type="text"
            value={profileData.address.line1}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                address: { ...profileData.address, line1: e.target.value },
              })
            }
            className="w-full p-2 border rounded-md"
            disabled={!isEditing}
          />
        </div>

        {/* Address Line 2 */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Address Line 2</label>
          <input
            type="text"
            value={profileData.address.line2}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                address: { ...profileData.address, line2: e.target.value },
              })
            }
            className="w-full p-2 border rounded-md"
            disabled={!isEditing}
          />
        </div>

        {/* Profile Image Upload */}
        {isEditing && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Change Profile Picture</label>
            <input type="file" onChange={handleImageChange} className="w-full p-2 border rounded-md" />
          </div>
        )}

        <div className="flex justify-between">
          {isEditing ? (
            <div>
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-md"
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="ml-4 text-gray-500"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-md"
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
