import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/User/User_Login.css'; // Optional: for styling
import UserLoginPhoto from '../../media/UserLoginPhoto.png'; // Replace with your image path
import { Link, useNavigate } from 'react-router-dom';


const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/user/login', {
        email,
        password,
      });

      if (response.data.success) {
        alert('✅ Login successful!');
        navigate("/user/dashboard");
      } else{
        alert('❌ Invalid credentials');
      }
    }
    
    catch (error) {
    // If backend returns 401 Unauthorized
    if (error.response && error.response.status === 401) {
      alert('❌ Invalid credentials');
    } else {
      alert('⚠️ Login failed. Please try again.');
    }
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <img className="user-background-img" src={UserLoginPhoto} alt="UserLoginPhoto" />
      <div className="user-login-container">
        <form className="user-login-form" onSubmit={handleLogin}>
          <h2>User Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
        {/* <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <span>Don't have an account? </span>
          <Link to="/user/register" style={{ color: "#007bff", textDecoration: "none" }}>
            Sign up
          </Link>
        </div> */}

      </form>
    </div>
    </>
  );
};

export default UserLogin;