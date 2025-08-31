import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Admin/Admin_Dashboard.css';
import profileIcon from '../../media/profile1.png'; // Replace with your icon path

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <Link to="profile">
          <img src={profileIcon} alt="Admin Profile" className="sidebar-icon" />
        </Link>
      <h2>Admin Dashboard</h2><br />
      <ul>
        <li><Link to="manage-members">🤵Members</Link></li>
        <li><Link to="manage-drugs">💊Drugs</Link></li>
      </ul>
    </div>
  );
}
export default AdminSidebar;