import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import Authentication from './pages/Authentication'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProfilePage from './pages/UserProfile'
import ProtectedRoutes from './components/ProtectedRoutes'
function App() {

  return (
  
     <Router>
      <Routes>
        <Route path="/" element={<Authentication />} /> {/* Default Route */}
        <Route
          path='/user/profile'
          element={
            <ProtectedRoutes role="user">
              <UserProfilePage />
            </ProtectedRoutes>} />
      </Routes>
    </Router>
  )
}

export default App
