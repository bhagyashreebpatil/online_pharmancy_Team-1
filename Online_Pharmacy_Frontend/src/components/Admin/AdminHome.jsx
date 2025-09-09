import React, { useEffect, useContext } from 'react';
import { DashboardContext } from './DashboardContext';
import '../../styles/Admin/Admin_Home.css';

const AdminHome = () => {
  const {
    adminCount, setAdminCount,
    userCount, setUserCount,
    drugCount, setDrugCount
  } = useContext(DashboardContext);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/count")
      .then((res) => res.json())
      .then((data) => setAdminCount(data))
      .catch((err) => console.error("Error fetching admin count:", err));

    fetch("http://localhost:5000/api/user/count")
      .then((res) => res.json())
      .then((data) => setUserCount(data))
      .catch((err) => console.error("Error fetching user count:", err));

    fetch('http://localhost:5000/api/drugs')
      .then(res => res.json())
      .then(data => setDrugCount(data.length))
      .catch(err => console.error('Error fetching drugs:', err));
  }, []);

  return (
    <div className="admin-summary">
      <h2>📊 System Overview</h2>
      <div className="summary-grid">
        <div className="summary-card count"><h3>👑 Admin Profiles</h3><p>{adminCount}</p></div>
        <div className="summary-card count"><h3>👥 Registered Users</h3><p>{userCount}</p></div>
        <div className="summary-card count"><h3>💊 Available Drugs</h3><p>{drugCount}</p></div>
        <div className="summary-card status"><h3>📦 Inventory Health</h3><p>{drugCount > 0 ? 'Stock levels stable' : 'No drugs available'}</p></div>
      </div>
    </div>
  );
};

export default AdminHome;