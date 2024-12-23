import axios from 'axios'

const API_URL = "http://localhost:3000/auth"

const postSignup = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, data)
        console.log(response,"response from api/auth ")
        return response
    } catch (error) {
        console.log(error.message)
    }
}
export default  postSignup