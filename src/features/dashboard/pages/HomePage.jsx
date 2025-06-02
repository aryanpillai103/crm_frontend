import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { campaignApi } from '../../campaigns/api/CampaignApi';
import customerApi from '../../customers/api/CustomerApi';

export default function DashboardLayout() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    activeCampaigns: 0,
    conversionRate: 0,
    recentActivity: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customers = await customerApi.getCustomers();
        const campaigns = await campaignApi.getCampaigns();
        
        setStats({
          totalCustomers: customers.length,
          activeCampaigns: campaigns.filter(c => c.status === 'active').length,
          conversionRate: 32.5,
          recentActivity: [
            { id: 1, type: 'campaign', action: 'sent', target: 'Summer Sale', time: '2 hours ago' },
            { id: 2, type: 'customer', action: 'added', target: 'John Smith', time: '5 hours ago' },
            { id: 3, type: 'segment', action: 'created', target: 'High Value Customers', time: '1 day ago' }
          ]
        });
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (isLoading) return <div className="flex justify-center items-center h-screen text-lg">Loading dashboard...</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - width decreased to w-56 */}
      <nav className="sidebar bg-gray-800 text-white w-56 min-h-screen p-4">
        <div className="flex items-center justify-between mb-8 p-2 border-b border-gray-700">
          <h1 className="text-xl font-bold">Navigation</h1>
        </div>
        <ul className="space-y-2">
          <li>
            <Link 
              to="/dashboard" 
              className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/customers" 
              className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Customers
            </Link>
          </li>
          <li>
            <Link 
              to="/campaigns" 
              className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
              Campaigns
            </Link>
          </li>
          <li>
            <Link 
              to="/segments" 
              className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              Segments
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">CRM Dashboard</h1>
          <div className="space-x-3">
            <button 
              onClick={() => navigate('/customers/new')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Add Customer
            </button>
            <button 
              onClick={() => navigate('/campaigns/new')}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Create Campaign
            </button>
            <button 
              onClick={() => navigate('/segments/new')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Build Segment
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 font-medium mb-2">Total Customers</h3>
            <p className="text-3xl font-bold text-gray-800 mb-1">{stats.totalCustomers}</p>
            <p className="text-green-500 text-sm">↑ 12% from last month</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 font-medium mb-2">Active Campaigns</h3>
            <p className="text-3xl font-bold text-gray-800 mb-1">{stats.activeCampaigns}</p>
            <p className="text-blue-500 text-sm">3 launching soon</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 font-medium mb-2">Conversion Rate</h3>
            <p className="text-3xl font-bold text-gray-800 mb-1">{stats.conversionRate}%</p>
            <p className="text-red-500 text-sm">↓ 2.1% from average</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 font-medium mb-2">Revenue Impact</h3>
            <p className="text-3xl font-bold text-gray-800 mb-1">$24,580</p>
            <p className="text-green-500 text-sm">↑ 18% from last quarter</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <ul className="space-y-3">
              {stats.recentActivity.map(activity => (
                <li key={activity.id} className="flex items-start space-x-3">
                  <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full 
                    ${activity.type === 'campaign' ? 'bg-green-100 text-green-800' : 
                      activity.type === 'customer' ? 'bg-blue-100 text-blue-800' : 
                      'bg-purple-100 text-purple-800'}`}>
                    {activity.type}
                  </span>
                  <span className="text-gray-700">
                    {activity.action} <strong className="font-medium">{activity.target}</strong> {activity.time}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">AI Recommendations</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 rounded">
              <p className="flex items-start text-gray-800">
                <span className="mr-2 text-xl">🚀</span>
                <span><strong className="font-medium">Launch a re-engagement campaign</strong> for 142 inactive customers</span>
              </p>
              <button 
                onClick={() => navigate('/campaigns/new')}
                className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                Create Campaign
              </button>
            </div>
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded">
              <p className="flex items-start text-gray-800">
                <span className="mr-2 text-xl">🎯</span>
                <span><strong className="font-medium">Create a segment</strong> of high-value customers for exclusive offers</span>
              </p>
              <button 
                onClick={() => navigate('/segments/new')}
                className="mt-2 bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                Build Segment
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}