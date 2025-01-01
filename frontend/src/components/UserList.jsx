import React, { useEffect, useState } from "react";
import { getAllUser } from "../api/admin";
import { useSelector } from "react-redux";

const UserList = () => {
    const [users,setUsers] = useState([])
    const token = useSelector((state)=>state.auth.token)
    useEffect(() => {
        const fetchUsers = async() => {
            const userList = await getAllUser(token)
            console.log(userList,"list from useEffect ")
            setUsers(userList)
            console.log(users)
        }
        fetchUsers()
 },[])

  // Handle block/unblock user
  const toggleBlock = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Active" ? "Blocked" : "Active" }
          : user
      )
    );
  };

  // Handle edit user
  const handleEdit = (id) => {
    alert(`Edit user with ID: ${id}`);
    // Implement edit logic here
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
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200`}
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      user.block === 'true'
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleBlock(user.id)}
                    className={`px-3 py-1 rounded-md ${
                      user.status === "Active"
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {user.status === "Active" ? "Block" : "Unblock"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
