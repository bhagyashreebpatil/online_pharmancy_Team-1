import React, { useEffect, useContext } from 'react';
import { DashboardContext } from './DashboardContext';
import '../../styles/Admin/Admin_Home.css';

const AdminHome = () => {
  const {
    adminCount, setAdminCount,
    memberCount, setMemberCount,
    drugCount, setDrugCount
  } = useContext(DashboardContext);

  useEffect(() => {
    // Fetch admin count
    fetch('http://localhost:5000/api/admins')
      .then(res => res.json())
      .then(data => setAdminCount(data.length))
      .catch(err => console.error('Error fetching admins:', err));

    // Fetch member count
    fetch('http://localhost:5000/api/members')
      .then(res => res.json())
      .then(data => setMemberCount(data.length))
      .catch(err => console.error('Error fetching members:', err));

    // Fetch drug count
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
        <div className="summary-card count"><h3>👥 Registered Members</h3><p>{memberCount}</p></div>
        <div className="summary-card count"><h3>💊 Available Drugs</h3><p>{drugCount}</p></div>
        <div className="summary-card status"><h3>📦 Inventory Health</h3><p>{drugCount > 0 ? 'Stock levels stable' : 'No drugs available'}</p></div>
      </div>
    </div>
  );
};

export default AdminHome;