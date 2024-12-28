import axios from 'axios'
import toast from 'react-hot-toast'

const API_URL = "http://localhost:3000/user"


export const getProfile = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/profile`, )
        return reponse
    } catch (error) {
        toast.error(error.message|| 'error updating profile');

    }
    
}

export const updateProfile = async (data) => {
    try {
        const response = await axios.patch(`${API_URL}/update`, data)
        return reponse
    } catch (error) {
        toast.error(error.message|| 'error updating profile');

    }
}