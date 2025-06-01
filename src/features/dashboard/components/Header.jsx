import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/slices/authSlice';

export default function Header({ user }) {
  const dispatch = useDispatch();
  
  return (
    <header className="dashboard-header">
      <div className="user-info">
        <span>Welcome, {user?.name}</span>
      </div>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </header>
  );
}