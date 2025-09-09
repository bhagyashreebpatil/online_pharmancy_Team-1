import React from 'react';
import '../../styles/Shared/Footer.css'
const Footer = () => {
  return (
    <footer className="pharmacy-footer">
      <div className="footer-sections">

        <div className="footer-brand">
          <h2>Online Pharmacy</h2>
          <p className='contact'>Your trusted source for genuine medicines and healthcare essentials.</p>
        </div>

        <div className="footer-category">
          <h3>Categories</h3>
          <ul>
            <li>Antibiotics</li>
            <li>Pain Relievers</li>
            <li>Vitamins & Supplements</li>
            <li>Skin Care</li>
            <li>Diabetes Care</li>
            <li>Heart & BP</li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/user/login">User Login</a></li>
            <li><a href="/user/register">User Register</a></li>
            <li><a href="/admin/login">Admin Login</a></li>
            <li><a href="/admin/register">Admin Register</a></li>
            <li><a href="/user/dashboard/drugs">Browse Drugs</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p className='contact'>Email: support@onlinepharmacy.in</p>
          <p className='contact'>Phone: +91 98765 43210</p>
          <p className='contact'>Address: 2nd Floor, HealthHub Towers, Bengaluru, KA</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p className='contact'>&copy; {new Date().getFullYear()} Online Pharmacy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;