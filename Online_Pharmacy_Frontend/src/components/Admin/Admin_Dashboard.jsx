<<<<<<< HEAD
=======
// // import React from 'react';
// // import AdminSidebar from './Admin_Sidebar';
// // import '../../styles/Admin/Admin_Dashboard.css';
// // import { Outlet } from 'react-router-dom';

// // const AdminDashboard = () => {
// //   return (
// //     <div className="admin-dashboard">
// //      <AdminSidebar />
// //       <main className="admin-content1">
// //         <Outlet />
// //       </main>


// //     </div>
// //   );
// // };

// // export default AdminDashboard;

// import React, { useEffect, useState } from 'react';
// import AdminSidebar from './Admin_Sidebar';
// import '../../styles/Admin/Admin_Dashboard.css';
// import { Outlet } from 'react-router-dom';

// const AdminDashboard = () => {
//   const [adminCount, setAdminCount] = useState(0);
//   const [memberCount, setMemberCount] = useState(0);
//   const [drugCount, setDrugCount] = useState(0);

//   useEffect(() => {
//     // Fetch admin count
//     fetch('http://localhost:5000/api/admin')
//       .then(res => res.json())
//       .then(data => setAdminCount(data.length))
//       .catch(err => console.error('Failed to fetch admins:', err));

//     // Fetch member count
//     fetch('http://localhost:5000/api/members')
//       .then(res => res.json())
//       .then(data => setMemberCount(data.length))
//       .catch(err => console.error('Failed to fetch members:', err));

//     // Fetch drug count
//     fetch('http://localhost:5000/api/drugs')
//       .then(res => res.json())
//       .then(data => setDrugCount(data.length))
//       .catch(err => console.error('Failed to fetch drugs:', err));
//   }, []);

//   return (
//     <div className="admin-dashboard">
//       <AdminSidebar />
//       <main className="admin-content1">
//         {/* 🔄 Nested Routes */}
//         <Outlet context={{ adminCount, memberCount, drugCount }} />
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

>>>>>>> 73c11c39d08b33b52e962689625cd87f7349c47c
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
<<<<<<< HEAD
    
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
=======
    const token = localStorage.getItem('token');

    Promise.all([
      // ✅ Corrected admin count endpoint
      fetch('http://localhost:5000/api/admin/count', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => res.json()).then(setAdminCount),

      fetch('http://localhost:5000/api/members', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => res.json()).then(data => setMemberCount(data.length)),

      fetch('http://localhost:5000/api/drugs', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => res.json()).then(data => setDrugCount(data.length))
    ])
    .catch(err => console.error('Dashboard fetch error:', err))
    .finally(() => setLoading(false));
>>>>>>> 73c11c39d08b33b52e962689625cd87f7349c47c
  }, []);

  if (loading) {
    return <div className="admin-dashboard">Loading dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <main className="admin-content1">
<<<<<<< HEAD
        <Outlet context={{ adminCount, userCount, drugCount }} />
=======
        {/* 🔄 Pass counts to nested routes */}
        <Outlet context={{ adminCount, memberCount, drugCount }} />
>>>>>>> 73c11c39d08b33b52e962689625cd87f7349c47c
      </main>
    </div>
  );
};

export default AdminDashboard;