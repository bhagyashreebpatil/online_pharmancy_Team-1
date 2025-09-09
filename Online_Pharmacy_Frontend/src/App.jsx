import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { DashboardProvider } from './components/Admin/DashboardContext';
import AdminLogin from './components/Admin/Admin_Login';
import AdminRegister from './components/Admin/Admin_Register';
import Navbar from './components/Shared/Navbar';
import AdminDashboard from './components/Admin/Admin_Dashboard';
import ManageMembers from './components/Admin/Manage_Members';
import ManageDrugs from './components/Admin/Manage_Drugs';
import AdminHome from './components/Admin/AdminHome';
import UserDrugs from './components/User/User_Drugs';
import UserDashboard from './components/User/User_Dashboard';
import Footer from './components/Shared/Footer';
import Cart from './components/User/Cart';
import ErrorBoundary from './components/User/ErrorBoundary';
import UserLogin from './components/User/User_Login';
import UserHome from './components/User/User_Home';
import Payment from './components/User/Payment';
import UserRegisterForm from './components/User/User_Register';


const AppRoutes = () => {
  const location = useLocation();

  const showNavbarRoutes = [
    '/admin/login',
    '/admin/register',
    '/user/login',
    '/user/register',
    '/'
  ];
  const shouldShowNavbar = showNavbarRoutes.includes(location.pathname);
  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegisterForm />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/" element={<UserLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />}>
          <Route index element={<AdminHome />} />
          <Route path="manage-members" element={<ManageMembers />} />
          <Route path="manage-drugs" element={<ManageDrugs />} />
        </Route>
        <Route path="/user/dashboard" element={<UserDashboard/>}>
          <Route index element={<UserHome />} />
          <Route path="drugs" element={<UserDrugs />} />
          <Route path="cart" element={
            <ErrorBoundary>
              <Cart />
            </ErrorBoundary>
          } />
          <Route path="payment-user" element={<Payment />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

function App() {

  return (
    <>
    <Router>
      <DashboardProvider>
        <AppRoutes />
      </DashboardProvider>
    </Router>
    </>
  );
}

export default App;