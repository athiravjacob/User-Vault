import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom"
import toast from 'react-hot-toast';

const ProtectedRoutes = ({ children, role })=> {
    const { isAuthenticated, user } = useSelector((state) => state.auth)
    console.log(isAuthenticated,user)
    if (!isAuthenticated) {
        return <Navigate to="/" />
        
    }

    if (role && user?.role !== role) {
        return <Navigate to="/unauthorized" />;
      }
    
      return children;
}

export default ProtectedRoutes;
