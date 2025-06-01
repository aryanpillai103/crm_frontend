import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/customers">Customers</Link></li>
        <li><Link to="/campaigns">Campaigns</Link></li>
        <li><Link to="/segments">Segments</Link></li>
      </ul>
    </nav>
  );
}