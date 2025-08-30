import React, { useState } from 'react';
import UserSidebar from './User_Sidebar';
import { Outlet } from 'react-router-dom';
import '../../styles/User/User_Dashboard.css';

const UserDashboard = () => {
  const [cart, setCart] = useState([]);

  return (
    <div className="user-dashboard">
      <UserSidebar />
      <main className="user-content">
        <Outlet context={{ cart, setCart }}/>
      </main>
    </div>
  );
};

export default UserDashboard;