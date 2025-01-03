import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { UserIcon, EnvelopeIcon, PhoneIcon, CalendarIcon, ClockIcon, PencilIcon } from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux';
import { createUser } from '../api/admin'; // Assuming you have an API function to create a new user
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const token = useSelector((state) => state.auth.token);
    const [newUser, setNewUser] = useState({
        profileImage: "",
        name: "",
        email: "",       
        phoneNumber: "",
        gender: "",
        dob: "",
        password: "",  
  });
  const [isLoading, setIsLoading] = useState(false);

  
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
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
          setNewUser((prev) => ({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await createUser(newUser, token);
      console.log('User created successfully:', response);
      navigate('/admin/dashboard'); // Redirect to the user list or another page
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-gray-700 to-gray-900 flex justify-between items-center">
            <h3 className="text-2xl leading-6 font-semibold text-white">
              Add New User
            </h3>
          </div>

          <form onSubmit={handleSubmit} autoComplete='off'>
          <div className="w-full h-64 sm:h-80 md:h-96 bg-gray-200 flex items-center justify-center relative">
          {newUser.profileImage ? (
            <img
              src={newUser.profileImage}
              alt="Profile"
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <UserIcon className="h-32 w-32 text-gray-400" />
          )}
          {/* Ensure input is clickable */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute w-full h-full opacity-0 cursor-pointer"
          />
        </div>

            <div className="border-t border-green-200">
              <dl>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <UserIcon className="h-5 w-5 mr-2 text-gray-900" />
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="name"
                      value={newUser.name}
                      onChange={handleInputChange}
                      required
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </dd>
                </div>

                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <EnvelopeIcon className="h-5 w-5 mr-2 text-gray-900" />
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
                    <input
                      type="email"
                      name="email"
                      value={newUser.email|| ""}
                      onChange={handleInputChange}
                      required
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      autoComplete="new-password" // Added this line
                      data-lpignore="true"
                    />
                  </dd>
                </div>

                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <PhoneIcon className="h-5 w-5 mr-2 text-gray-900" />
                    Phone number
                  </dt>
                  <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="phoneNumber"
                      value={newUser.phoneNumber}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </dd>
                </div>

                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Gender</dt>
                  <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
                    <select
                      name="gender"
                      value={newUser.gender}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </dd>
                </div>

                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2 text-gray-900" />
                    Date of birth
                  </dt>
                  <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
                    <input
                      type="date"
                      name="dob"
                      value={newUser.dob}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </dd>
                </div>

                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <ClockIcon className="h-5 w-5 mr-2 text-gray-900" />
                    Password
                  </dt>
                  <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
                    <input
                      type="password"
                      name="password"
                      value={newUser.password}
                      onChange={handleInputChange}
                      autoComplete='off'
                      required
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </dd>
                </div>
              </dl>
            </div>

            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
                disabled={isLoading}
              >
                {isLoading ? 'Creating User...' : 'Create User'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
