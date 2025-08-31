import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import profileIcon from '../../media/profile1.png'; // Replace with your icon path

const UserSidebar = () => {
  return (
    <div className="user-sidebar">
      <Link to="profile">
        <img src={profileIcon} alt="User Profile" className="user-sidebar-icon" />
      </Link>
      <h2 className='user-panel'>User Panel</h2><br/>
      <ul>
        <li><Link to="drugs">💊Drugs</Link></li>
        <li><Link to="payment">💳Payment</Link></li>
      </ul>
    </div>
  );
};

export default UserSidebar;