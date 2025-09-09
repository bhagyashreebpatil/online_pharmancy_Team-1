import React, { useEffect, useContext } from 'react';
import { DashboardContext } from '../Admin/DashboardContext';
import '../../styles/User/User_Home.css';
import PharmacyImage from '../../media/Pharmacy.avif';

const UserHome = () => {
  const {
    userCount, setUserCount,
    drugCount, setDrugCount
  } = useContext(DashboardContext);

  useEffect(() => {
    
    fetch("http://localhost:5000/api/user/count")
      .then((res) => res.json())
      .then((data) => setUserCount(data))
      .catch((err) => console.error("Error fetching user count:", err));

    fetch('http://localhost:5000/api/user/drugs')
      .then(res => res.json())
      .then(data => setDrugCount(data.length))
      .catch(err => console.error('Error fetching drugs:', err));
  }, []);

  return (
    <div className='user-home'>
      <h2 className='system-overview'>📊 System Overview</h2>
      <div className="user-summary-grid">
        <div className="user-summary-card count">
          <h3>Users</h3>
          <p>{userCount}</p>
        </div>
        <div className="user-summary-card count">
          <h3>Available Drugs</h3>
          <p>{drugCount}</p>
        </div>
      </div>
      <img src={PharmacyImage} alt="Pharmacy" className='pharmacy-img'/>
    </div>
  );
};

export default UserHome;