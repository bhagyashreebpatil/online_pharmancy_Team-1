import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import profileIcon from '../../media/user-sidebar.jpg'; // Replace with your icon path

const UserSidebar = () => {
  return (
    <div className="user-sidebar">
      <img src={profileIcon} alt="User Profile" className="user-sidebar-icon" />
      <h2 className='user-panel'>User Panel</h2><br/>
      <ul>
        <li><Link to="drugs">💊Available Drugs</Link></li>
      </ul>
    </div>
  );
};

export default UserSidebar;