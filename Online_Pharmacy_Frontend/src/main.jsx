import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserLogin from './components/user/User_Login.jsx'
import AdminRegister from './components/Admin/Admin_Register.jsx'
import AdminLogin from './components/Admin/Admin_Login.jsx'
import UserRegisterForm from './components/user/User_Register.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
   {/* <AdminRegister /> */}
   {/* <AdminLogin /> */}
   {/* <UserLogin /> */}
   {/* <UserRegisterForm /> */}
  </StrictMode>,
)
