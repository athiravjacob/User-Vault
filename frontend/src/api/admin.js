import axios from 'axios'
const API_URL = "http://localhost:3000/admin"

export const getAllUser = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/getUsers`, {
            headers: {
                Authorization: `Bearer ${token}`, // Attach token in Authorization header
            },
        })
        console.log(response,"getAlluser")
        return response.data
    } catch (error) {
        console.error(error.message|| 'error updating profile');

    }
    
}