import React, { useState } from 'react'
import AdminNavbar from '../components/AdminNavbar'
import UserList from '../components/UserList'
import UserDetails from '../components/UserDetails'
import {Route,Routes} from 'react-router-dom'
function Dashboard() {

  return (
      <div>
         
      <AdminNavbar  />
              <Routes>
                <Route path="/" element={<UserList />} />
                <Route path="edit/:id" element={<UserDetails />} />
                <Route path="search"  />

                
              </Routes>
    </div>
  )
}

export default Dashboard