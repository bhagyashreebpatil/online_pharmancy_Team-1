import React, { useState } from 'react';
import axios from 'axios';
import '../styles/User_Register.css';
import user from '../media/user.jpg'; // Assuming you have a user image in assets

const UserRegisterForm = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
   const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post('http://localhost:5000/api/user/register', userData);
    alert('Registration successful!');
  } catch (error) {
    const message = error.response?.data || 'Registration failed!';
    alert(message);
  }
};

  return (
   <>
    <div className="page-container">
    <div className="image-section">
        <img className="user-img" src={user} alt="User_Img" />
    </div>
    <div className="form-section">
    <div className="registration-box">

    <form className="registration-wrapper" onSubmit={handleSubmit}>
      <h2>User Registration</h2>
      <input type="text" name="username" className="text-bar" placeholder="User Name" onChange={handleChange} required /><br /><br />
      <input type="email" name="email" className="text-bar" placeholder="Email" onChange={handleChange} required  /><br /><br />
      <input type="password" name="password" className="text-bar" placeholder="Password" onChange={handleChange} required /><br /><br />
      <button type="submit">Register</button>
    </form>
            </div>
        </div>
        </div>
    </>
  );
};

export default UserRegisterForm;