import React, { useEffect } from 'react';
// import { customerApi } from '../api/customerApi';

export default function CustomerList() {
  // const [customers, setCustomers] = useState([]);
  
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // const response = await customerApi.getCustomers();
        // setCustomers(response.data);
      } catch (err) {
        console.error('Failed to fetch customers:', err);
      }
    };
    
    fetchCustomers();
  }, []);

  return (
    <div className="customer-list p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Customers</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Purchase
              </th>
            </tr>
          </thead>
          {/* <tbody className="bg-white divide-y divide-gray-200">
            {customers.map(customer => (
              <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {customer.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.lastPurchase || <span className="text-gray-400">Never</span>}
                </td>
              </tr>
            ))}
          </tbody> */}
        </table>
        {/* {customers.length === 0 && ( */}
          <div className="text-center py-8 text-gray-500">
            No customers found
          </div>
        {/* )} */}
      </div>
    </div>
  );
}