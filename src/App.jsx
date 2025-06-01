
import { Routes, Route } from 'react-router-dom';
import LoginPage from './features/auth/pages/Login';
import DashboardLayout from './features/dashboard/layout/DashboardLayout';
import DashboardHome from './features/dashboard/pages/DashboardHome';
import ProtectedRoute from './common/ProtectedRoute';
import CustomerList from './features/customers/pages/CustomerList';
import HomePage from './features/dashboard/pages/HomePage';
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout />
          <HomePage />
        </ProtectedRoute>
      }>
        <Route index element={<DashboardHome />} />
        {/* Add other dashboard routes here */}
      </Route>
      <Route path="customers" element={<CustomerList />} />
    </Routes>
  );
}
