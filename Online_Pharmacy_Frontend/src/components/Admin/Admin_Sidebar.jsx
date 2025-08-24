import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Admin/Admin_Dashboard.css';

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <h2>🤵 Admin Dashboard</h2><br />
      <ul>
        <li><Link to="manage-members">Manage Members</Link></li>
        <li><Link to="manage-drugs">Manage Drugs</Link></li>
        <li><Link to="profile">Admin Profile</Link></li>
      </ul>
    </div>
  );
};

export default AdminSidebar;