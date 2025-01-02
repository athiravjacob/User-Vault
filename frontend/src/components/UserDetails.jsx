
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  ClockIcon,
  PencilIcon,
} from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux';
import { getProfile } from '../api/user';
import { editUserDetails } from  '../api/admin' ;
import { useParams } from 'react-router-dom';

const UserDetails = () => {
  const token = useSelector((state) => state.auth.token);
  const {id} = useParams()
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await getProfile(id, token); 
        setEditableUser(profileData);
        console.log(profileData,"useeffect profileDatA")
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setLoading(false);
      }
    };
    fetchData()

    
  }, [id, token]); 
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const cloudName = 'doj6w5ib1';
    const uploadPreset = 'uservault';

    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response.data.secure_url) {
          setEditableUser((prev) => ({
            ...prev,
            profileImage: response.data.secure_url,
          }));
        } else {
          console.error('Error uploading image to Cloudinary:', response.data);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const onSave = async (updatedUser) => {
    try {
      const response = await editUserDetails(updatedUser, token);
      console.log('Profile updated successfully:', response);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-gray-700 to-gray-900 flex justify-between items-center">
              <h3 className="text-2xl leading-6 font-semibold text-white">
                Profile
              </h3>
              <button
                onClick={() => setIsEditing((prev) => !prev)}
                className="text-white hover:text-gray-300 focus:outline-none"
              >
                <PencilIcon className="h-6 w-6" />
              </button>
            </div>

            {editableUser.profileImage ? (
              <div className="w-full h-64 sm:h-80 md:h-96 overflow-hidden">
                {isEditing ? (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full"
                  />
                ) : (
                  <img
                    src={editableUser.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover object-center"
                  />
                )}
              </div>
            ) : (
              <div className="w-full h-64 sm:h-80 md:h-96 bg-gray-200 flex items-center justify-center">
                {isEditing ? (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full"
                  />
                ) : (
                  <UserIcon className="h-32 w-32 text-gray-400" />
                )}
              </div>
            )}

            <div className="border-t border-green-200">
              <dl>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <UserIcon className="h-5 w-5 mr-2 text-gray-900" />
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
                    {editableUser?.name || 'No Name Available'}
                  </dd>
                </div>

                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <EnvelopeIcon className="h-5 w-5 mr-2 text-gray-900" />
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
                    {editableUser?.email || 'No Email Available'}
                  </dd>
                </div>

                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <PhoneIcon className="h-5 w-5 mr-2 text-gray-900" />
                    Phone number
                  </dt>
                  <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
                    {isEditing ? (
                      <input
                        type="text"
                        name="phoneNumber"
                        value={editableUser.phoneNumber || ''}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                      />
                    ) : (
                      editableUser.phoneNumber || 'Not Provided'
                    )}
                  </dd>
                </div>

                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Gender</dt>
                  <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
                    {isEditing ? (
                      <select
                        name="gender"
                        value={editableUser.gender || ''}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      editableUser.gender || 'Not Specified'
                    )}
                  </dd>
                </div>

                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2 text-gray-900" />
                    Date of birth
                  </dt>
                  <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
                    {isEditing ? (
                      <input
                        type="date"
                        name="dob"
                        value={editableUser.dob || ''}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                      />
                    ) : (
                      formatDate(editableUser.dob)
                    )}
                  </dd>
                </div>

                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <ClockIcon className="h-5 w-5 mr-2 text-gray-900" />
                    Registered on
                  </dt>
                  <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
                    {formatDate(editableUser.createdAt)}
                  </dd>
                </div>
              </dl>
            </div>

            {isEditing && (
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  onClick={() => onSave(editableUser)}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
