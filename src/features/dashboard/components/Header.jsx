import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/slices/authSlice';

export default function Header() { //{ user }
  const dispatch = useDispatch();
  
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center space-x-2">
        <span className="text-gray-700 font-medium">Welcome Aryan</span>
      </div>
      <button 
        onClick={() => dispatch(logout())}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        Logout
      </button>
    </header>
  );
}