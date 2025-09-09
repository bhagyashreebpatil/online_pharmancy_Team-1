import React, { useEffect, useState } from 'react';
import AdminSidebar from './Admin_Sidebar';
import '../../styles/Admin/Admin_Dashboard.css';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const [adminCount, setAdminCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [drugCount, setDrugCount] = useState(0);

  useEffect(() => {
    
    fetch('http://localhost:5000/api/admins')
      .then(res => res.json())
      .then(data => setAdminCount(data.length))
      .catch(err => console.error('Failed to fetch admins:', err));

    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(data => setUserCount(data.length))
      .catch(err => console.error('Failed to fetch users:', err));

    fetch('http://localhost:5000/api/drugs')
      .then(res => res.json())
      .then(data => setDrugCount(data.length))
      .catch(err => console.error('Failed to fetch drugs:', err));
  }, []);

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <main className="admin-content1">
        <Outlet context={{ adminCount, userCount, drugCount }} />
      </main>
    </div>
  );
};

export default AdminDashboard;