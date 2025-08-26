// import React from 'react';
// import AdminSidebar from './Admin_Sidebar';
// import '../../styles/Admin/Admin_Dashboard.css';
// import { Outlet } from 'react-router-dom';

// const AdminDashboard = () => {
//   return (
//     <div className="admin-dashboard">
//      <AdminSidebar />
//       <main className="admin-content1">
//         <Outlet />
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
  const [memberCount, setMemberCount] = useState(0);
  const [drugCount, setDrugCount] = useState(0);

  useEffect(() => {
    // Fetch admin count
    fetch('http://localhost:5000/api/admins')
      .then(res => res.json())
      .then(data => setAdminCount(data.length))
      .catch(err => console.error('Failed to fetch admins:', err));

    // Fetch member count
    fetch('http://localhost:5000/api/members')
      .then(res => res.json())
      .then(data => setMemberCount(data.length))
      .catch(err => console.error('Failed to fetch members:', err));

    // Fetch drug count
    fetch('http://localhost:5000/api/drugs')
      .then(res => res.json())
      .then(data => setDrugCount(data.length))
      .catch(err => console.error('Failed to fetch drugs:', err));
  }, []);

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <main className="admin-content1">
        {/* 🔄 Nested Routes */}
        <Outlet context={{ adminCount, memberCount, drugCount }} />
      </main>
    </div>
  );
};

export default AdminDashboard;