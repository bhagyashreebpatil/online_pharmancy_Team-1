import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/User/User_Login.css'; 
import UserLoginPhoto from '../../media/UserLoginPhoto.jpg';
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
        localStorage.setItem("user", JSON.stringify(response.data.user));
        alert('✅ Login successful!');
        navigate("/user/dashboard");
      } else{
        alert('❌ Invalid credentials');
      }
    }
    
    catch (error) {
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
        <form className="user-login-form" onSubmit={handleLogin} autoComplete="off">
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
      </form>
    </div>
    </>
  );
};

export default UserLogin;