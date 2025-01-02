import axios from './axios'
import toast from 'react-hot-toast'

const API_URL = "http://localhost:3000/user"


export const getProfile = async (id,token) => {
    try {
        console.log("hello from get profile frontend")
        const response = await axios.get(`${API_URL}/profile/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        })
        console.log(response,"getprofile")
        return response.data
    } catch (error) {
        console.log(error)

    }
    
}

export const updateProfile = async (data,token) => {
    console.log(data, "update profile api")
    const {name,email,dob,phoneNumber,profileImage,role,id,gender}=data
    
    try {
        const response = await axios.post(`${API_URL}/update`, {name,email,dob,phoneNumber,profileImage,role,id,gender}, {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token in Authorization header
            },
        });
        console.log(response,"api update profile")
        return response.data
    } catch (error) {
        toast.error(error.message|| 'error updating profile');

    }
}