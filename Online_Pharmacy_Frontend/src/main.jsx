import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminRegister from './components/Admin_Register.jsx'
import UserRegisterForm from './components/User_Register.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <AdminRegister />
    <UserRegisterForm />
  </StrictMode>,
)
