import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Admin/Admin_Dashboard.css';
import profileIcon from '../../media/profi.webp'; 
const AdminSidebar = () => {
  return (
    <>
      
      <div className="admin-sidebar">
        <img src={profileIcon} alt="Admin Profile" className="sidebar-icon" />
        <h2>Admin Dashboard</h2><br />
        <ul>
          <li><Link to="manage-members">🤵Members</Link></li>
          <li><Link to="manage-drugs">💊Drugs</Link></li>
        </ul>
      </div>
      
    </>
  );
}
export default AdminSidebar;