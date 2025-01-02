import React, { useEffect, useState } from "react";
import { blockUser, getAllUser, search } from "../api/admin";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([])
  const location = useLocation()

  const token = useSelector((state) => state.auth.token)
  const navigate = useNavigate()
    useEffect(() => {
        const fetchUsers = async() => {
           try {
             const params = new URLSearchParams(location.search)
             const searchTerm = params.get('search')

             if (searchTerm && searchTerm.trim() !=='') {
               const filteredUser = await search(searchTerm, token)
               setUsers(filteredUser)
             } else {
              const allUsers = await getAllUser(token);
              setUsers(allUsers);
             }
             
           } catch (error) {
            console.log(error)
           }
        }
        fetchUsers()
 },[location.search, token])

  // Handle block/unblock user
  const toggleBlock = async(id) => {
    const block = await blockUser(id,token)
    setUsers((prevUsers) =>
    prevUsers.map((user) =>
      user._id === id
        ? { ...user, block: user.block === true ? false : true }
        : user
    )
  );  };

  // Handle edit user
  const handleEdit = (id) => {
    navigate(`edit/${id}`);     // Implement edit logic here
  };

  return (
    <div className="container max-w-7xl mx-auto p-6">
      {/* <h1 className="text-3xl font-bold text-gray-700 mb-4">Admin Dashboard</h1> */}
  
      <div className="bg-white shadow-md rounded-lg mt-10 overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-center">Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
              <th className="px-4 py-2 text-center"></th>

            </tr>
          </thead>
          <tbody>
            {!users || users.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center px-4 py-2">
                  No users available
                </td>
              </tr>
            ) :
              (
                users.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } hover:bg-gray-200`}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${user.block
                            ? "bg-red-200 text-red-700"
                            : "bg-green-200 text-green-700"
                          }`}
                      >
                        {user.block ? "Blocked" : "Active"}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => toggleBlock(user._id)}
                        className={`px-3 py-1 rounded-md ${user.block
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-red-500 text-white hover:bg-red-600"
                          }`}
                      >
                        {user.block ? "UnBlock" : "Block"}
                      </button>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button onClick={() => handleEdit(user._id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-6 w-6 text-gray-700 hover:text-gray-900"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
  
};

export default UserList;
