import React from 'react'
// import Navbar from './components/Navbar'
import {BrowserRouter as Router , Routes, Route , Outlet } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
function App() {
  return (
    <>
      <Router>
  
        <Routes>
          <Route path="/register" element={<Register/>}/> 
          <Route path="/login" element={<Login/>}/>    
          <Route path="/dashboard" element={<Dashboard/>}/>        
        </Routes>
      </Router>
    </>
  )
}

export default App