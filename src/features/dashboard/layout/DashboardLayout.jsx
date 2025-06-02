import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import HomePage from '../pages/HomePage';

export default function DashboardLayout() {
  const user = useSelector((state) => state.auth.user);
  
  return (
    <div className="dashboard-container">
      
      <div className="main-content">
        <Header user={user} />
        {/* <Sidebar /> */}
        <HomePage/>
        <div className="content-area">
        {/* <Outlet /> */}
        
        </div>
      </div>
    </div>
  );
}