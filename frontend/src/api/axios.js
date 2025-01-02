import axios from "axios";
import  store  from "../redux/store";
import toast from "react-hot-toast";
import { logout } from "../redux/slices/authSlice";


axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 403) {
                toast.error('You are blocked by the admin')
                store.dispatch(logout())
            } else if (error.response.status === 401) {
                toast.error('Unauthorized .Access Denied')
                store.dispatch(logout())
            } else {
                toast.error(error.response.data.message||"Unexpected error occured")
            }
        }

        return Promise.reject(error)
    }
)
export default axios