import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './components/Admin_Register.css';
import AdminRegister from './components/Admin_Register.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <AdminRegister />
  </StrictMode>,
)
