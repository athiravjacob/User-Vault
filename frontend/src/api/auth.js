import axios from './axios'
import toast from 'react-hot-toast'

const API_URL = "http://localhost:3000/auth"

export const postSignup = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, data)
        console.log(response,"response from api/auth ")
        return response
    } catch (error) {
        toast.error(error.message);
        console.log(error.message)
    }
}

export const postSignIn = async (data) => {
    console.log(data)
    try {
        const response = await axios.post(`${API_URL}/signin`, data)
        console.log(response,"front response")
        return response
    } catch (error) {
        console.log(error.response.data.message)
        toast.error(error.response.data.message|| 'Signup failed');
    }
}


