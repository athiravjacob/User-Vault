import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import UserList from '../components/UserList'
function Dashboard() {
  return (
      <div>
          <AdminNavbar></AdminNavbar>
          <UserList></UserList>
    </div>
  )
}

export default Dashboard