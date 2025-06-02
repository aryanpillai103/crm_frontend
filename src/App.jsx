import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './features/dashboard/layout/DashboardLayout';
import DashboardHome from './features/dashboard/pages/DashboardHome';
import CustomerList from './features/customers/pages/CustomerList';
import HomePage from './features/dashboard/pages/HomePage';
import './index.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<HomePage />} />
       
        
        {/* Add other routes here */}
      </Route>
       <Route path="dashboard" element={<DashboardHome />} />
       <Route path="customers" element={<CustomerList />} />

    </Routes>
  );
}
