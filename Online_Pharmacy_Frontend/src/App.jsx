import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLogin from './components/user/User_Login';
import UserRegisterForm from './components/user/User_Register';
import AdminLogin from './components/Admin/Admin_Login';
import AdminRegister from './components/Admin/Admin_Register';
import Navbar from './components/Shared/Navbar';


// Add other imports like AdminLogin, AdminRegister if needed

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* User Routes */}
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegisterForm />} />

        {/* Optional: Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        
        {/* Optional: Home or fallback */}
        <Route path="/" element={<UserLogin />} />

      </Routes>
    </Router>
  );
}

export default App;