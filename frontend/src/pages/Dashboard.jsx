import React, { useState } from 'react'
import AdminNavbar from '../components/AdminNavbar'
import UserList from '../components/UserList'
import UserDetails from '../components/UserDetails'
import AddUser from '../components/AddUser'
import {Route,Routes} from 'react-router-dom'
function Dashboard() {

  return (
      <div>
         
      <AdminNavbar  />
              <Routes>
                <Route path="/" element={<UserList />} />
                <Route path="edit/:id" element={<UserDetails />} />
                <Route path="addUser" element={<AddUser />}  />

                
              </Routes>
    </div>
  )
}

export default Dashboard