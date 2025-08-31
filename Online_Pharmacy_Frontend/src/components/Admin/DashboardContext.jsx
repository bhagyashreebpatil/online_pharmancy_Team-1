import React, { createContext, useState } from 'react';

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [adminCount, setAdminCount] = useState(0);
  const [memberCount, setMemberCount] = useState(0);
  const [drugCount, setDrugCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  return (
    <DashboardContext.Provider value={{
      adminCount, setAdminCount,
      memberCount, setMemberCount,
      drugCount, setDrugCount,
      userCount, setUserCount
    }}>
      {children}
    </DashboardContext.Provider>
  );
};