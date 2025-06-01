import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function DashboardLayout() {
  const user = useSelector((state) => state.auth.user);
  
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header user={user} />
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
}