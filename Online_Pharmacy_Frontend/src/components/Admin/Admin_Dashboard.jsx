
// import React, { useEffect, useState } from 'react';
// import AdminSidebar from './Admin_Sidebar';
// import '../../styles/Admin/Admin_Dashboard.css';
// import { Outlet } from 'react-router-dom';

// const AdminDashboard = () => {
//   const [adminCount, setAdminCount] = useState(0);
//   const [userCount, setUserCount] = useState(0);
//   const [drugCount, setDrugCount] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {    
//     fetch('http://localhost:5000/api/admins')
//       .then(res => res.json())
//       .then(data => setAdminCount(data.length))
//       .catch(err => console.error('Failed to fetch admins:', err));

//     fetch('http://localhost:5000/api/users')
//       .then(res => res.json())
//       .then(data => setUserCount(data.length))
//       .catch(err => console.error('Failed to fetch users:', err));

//     fetch('http://localhost:5000/api/drugs')
//       .then(res => res.json())
//       .then(data => setDrugCount(data.length))
//       .catch(err => console.error('Failed to fetch drugs:', err));

//     const token = localStorage.getItem('token');

//     Promise.all([
//       // ✅ Corrected admin count endpoint
//       fetch('http://localhost:5000/api/admin/count', {
//         headers: { Authorization: `Bearer ${token}` }
//       }).then(res => res.json()).then(setAdminCount),

//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     Promise.all([
//       // ✅ Corrected admin count endpoint
//       fetch('http://localhost:5000/api/admin/count', {
//         headers: { Authorization: `Bearer ${token}` }
//       }).then(res => res.json()).then(setAdminCount),

//       fetch('http://localhost:5000/api/members', {
//         headers: { Authorization: `Bearer ${token}` }
//       }).then(res => res.json()).then(data => setMemberCount(data.length)),

//       fetch('http://localhost:5000/api/drugs', {
//         headers: { Authorization: `Bearer ${token}` }
//       }).then(res => res.json()).then(data => setDrugCount(data.length))
//     ])
//     .catch(err => console.error('Dashboard fetch error:', err))
//     .finally(() => setLoading(false));

//   }, []);

//   if (loading) {
//     return <div className="admin-dashboard">Loading dashboard...</div>;
//   }

//   return (
//     <div className="admin-dashboard">
//       <AdminSidebar />
//       <main className="admin-content1">

//         <Outlet context={{ adminCount, userCount, drugCount }} />
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from 'react';
import AdminSidebar from './Admin_Sidebar';
import '../../styles/Admin/Admin_Dashboard.css';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const [adminCount, setAdminCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [drugCount, setDrugCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    Promise.all([
      fetch('http://localhost:5000/api/admin/count', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => res.json()).then(setAdminCount),

      fetch('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => res.json()).then(data => setUserCount(data.length)),

      fetch('http://localhost:5000/api/drugs', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => res.json()).then(data => setDrugCount(data.length))
    ])
    .catch(err => console.error('Dashboard fetch error:', err))
    .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="admin-dashboard">Loading dashboard...</div>;
  }

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