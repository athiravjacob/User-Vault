import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../redux/slices/authSlice";
import { search } from '../api/admin';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const admin = useSelector((state) => state.auth.user)
  const token = useSelector((state)=>state.auth.token)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSearch = async(e) => {
    e.preventDefault();
    navigate(`?search=${searchQuery}`)
  };

  const addUser = () => {
    navigate(`/admin/dashboard/addUser`)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white shadow dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span onClick={()=>navigate("/admin/dashboard")}  className="text-2xl font-bold text-gray-800 dark:text-white">User Vault</span>
            </div>
          </div>
          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs">
              <form onSubmit={handleSearch} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  type="search"
                  placeholder="Search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                id="user-menu"
                aria-label="User menu"
                aria-haspopup="true"
              >
                <img className="h-8 w-8 rounded-full" src="https://via.placeholder.com/40" alt="Admin" />
              </button>
              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                  <div className="py-1 rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                    <div className="px-4 py-2 text-sm text-gray-700">
                      <p className="font-medium">{admin.name}</p>
                      <p className="text-xs text-gray-500">{admin.email }</p>
                    </div>
                    <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={addUser}>Add User</span>
                    <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={()=>dispatch(logout())}>Log out</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;

