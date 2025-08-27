import React from 'react';
import UserSidebar from './User_Sidebar';
import { Outlet } from 'react-router-dom';
import '../../styles/User/User_Dashboard.css';

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
      <UserSidebar />
      <main className="user-content">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
