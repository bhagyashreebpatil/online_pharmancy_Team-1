import React from 'react';
import AdminSidebar from './Admin_Sidebar';
import '../../styles/Admin/Admin_Dashboard.css';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
     <AdminSidebar />
      <main className="admin-content1">
        <Outlet />
      </main>


    </div>
  );
};

export default AdminDashboard;