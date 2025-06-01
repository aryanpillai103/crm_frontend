import React, { useEffect, useState } from 'react';
import { customerApi } from '../api/customerApi';

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await customerApi.getCustomers();
        setCustomers(response.data);
      } catch (err) {
        console.error('Failed to fetch customers:', err);
      }
    };
    
    fetchCustomers();
  }, []);

  return (
    <div className="customer-list">
      <h2>Customers</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Last Purchase</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.lastPurchase || 'Never'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}