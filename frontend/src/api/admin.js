import axios from './axios'
import toast from 'react-hot-toast'
const API_URL = "http://localhost:3000/admin"

export const getAllUser = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/getUsers`, {
            headers: {
                Authorization: `Bearer ${token}`, // Attach token in Authorization header
            },
        })
        return response.data
    } catch (error) {
        console.error(error.message|| 'error updating profile');

    }
    
}

export const editUserDetails = async (data,token) => {
    console.log(data, "edit user admin")
    const {name,email,dob,phoneNumber,profileImage,role,_id,gender}=data
    
    try {
        console.log(_id,"id from edit user detils admin")
        const response = await axios.post(`${API_URL}/editUser/${_id}`, {name,email,dob,phoneNumber,profileImage,role,_id,gender}, {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token in Authorization header
            },
        });
        return response.data
    } catch (error) {
        toast.error(error.message|| 'error updating profile');

    }
}

export const blockUser = async (id, token) => {
    try {
        console.log("block user frntend",token)
        const response = await axios.patch(`${API_URL}/toggleBlock/${id}`,{}, {
            headers: {
                Authorization: `Bearer ${token}`, // Attach token in Authorization header
              },
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const search = async (searchTerm, token) => {
    try {
        console.log(searchTerm, "search frnt")
        console.log(token, "search frnt")

        const response = await axios.get(`${API_URL}/search`,{ params: { searchTerm }, 
            headers: {
                Authorization: `Bearer ${token}`, // Attach token in Authorization header
              },
        })
        return response.data
    } catch (error) {
        console.log(error)

    }
}
export const createUser = async (newUser, token) => {
    const {name,email,dob,phoneNumber,profileImage,role,gender,password}=newUser
    
    try {
        const response = await axios.post(`${API_URL}/createUser`, {name,email,dob,phoneNumber,profileImage,role,password,gender}, {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token in Authorization header
            },
        });
        console.log(response,"create user")
        return response.data
    } catch (error) {
        toast.error(error.message|| 'error createing new profile');

    }
}