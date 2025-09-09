import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Shared/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">💊Online Pharmacy</h2>
      <ul className="nav-links">
        <li><Link to="/admin/login">Admin Login</Link></li>
        <li><Link to="/user/login">User Login</Link></li>
        <li><Link to="/user/register">User Register</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;