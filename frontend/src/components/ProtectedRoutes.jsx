import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from "react-router-dom"
import toast from 'react-hot-toast';
import { logout } from '../redux/slices/authSlice';
import { persistor } from '../redux/store'; 

const ProtectedRoutes = ({ children, role })=> {
    const { isAuthenticated, user } = useSelector((state) => state.auth)
    const dispatch =useDispatch()
    console.log(isAuthenticated,user)
    if (!isAuthenticated) {
        return <Navigate to="/" />
        
    }
    

    if (role && user?.role !== role) {
        return <Navigate to="/" />;
      }
    
      return children;
}

export default ProtectedRoutes;
