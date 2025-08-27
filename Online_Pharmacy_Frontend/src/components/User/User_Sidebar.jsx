import React from 'react';
import { NavLink } from 'react-router-dom';

const UserSidebar = () => {
  return (
    <div className="user-sidebar">
      <h2>👤 User Panel</h2><br/>
      <ul>
        <li><NavLink to="profile">User Profile</NavLink></li>
        <li><NavLink to="drugs">Drugs</NavLink></li>
        <li><NavLink to="payment">Payment</NavLink></li>
      </ul>
    </div>
  );
};

export default UserSidebar;