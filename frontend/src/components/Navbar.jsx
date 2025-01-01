import React, { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";   // Solid version
import { useDispatch,useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { persistor } from '../redux/store';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user);


  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleSettings = () => {
    console.log("Settings clicked");
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    setIsMenuOpen(false);
    dispatch(logout())
    persistor.purge();
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-700">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="text-2xl font-bold text-white">User Vault</div>

        {/* Profile Menu */}
        <div className="relative">
        <button onClick={toggleMenu} className="focus:outline-none flex flex-col items-center">
    {user.profileImage ? (
      <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
        <img
          src={user.profileImage}
          alt="User Profile"
          className="w-full h-full object-cover"
        />
      </div>
    ) : (
      <UserCircleIcon className="w-10 h-10 text-gray-300 hover:text-gray-400 transition-all" />
    )}
    <p className="text-white font-mono text-xs">{user.name}</p>
  </button>
          {isMenuOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50"
            >
              <button
                onClick={handleSettings}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
