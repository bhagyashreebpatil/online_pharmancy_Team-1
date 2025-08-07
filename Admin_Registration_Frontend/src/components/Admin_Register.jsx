import React, { useState } from 'react';
import axios from 'axios';
import './Admin_Register.css'; 

const AdminRegister = () => {
  const [admin, setAdmin] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post('http://localhost:5000/api/admin/register', admin);
    alert('Registration successful!');
  } catch (error) {
    const message = error.response?.data || 'Registration failed!';
    alert(message);
  }
};

  return (
    <>
    <form onSubmit={handleSubmit}>
      <h2>Admin Registration</h2>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required /><br /><br />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required  /><br /><br />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br /><br />
      <button type="submit">Register</button>
    </form>
    </>
  );
};

export default AdminRegister;