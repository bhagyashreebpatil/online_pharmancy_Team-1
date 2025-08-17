import React, { useState } from 'react';
import axios from 'axios';  
import '../styles/Admin_Login.css';
import adminLoginImg from '../media/adminLoginImg.jpg'; 


const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:5000/api/admin/login", {
      email,
      password,
    });

    if (response.status === 200) {
      alert("Login successful!");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong.");
  }
};


  return(
    <>
    <div className="login-container">
      <div>
        <img className="login-background-img" src={adminLoginImg} alt="adminLoginImg" />
      </div>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          name="email"
          type="text"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  </>
  )

}

export default AdminLogin;