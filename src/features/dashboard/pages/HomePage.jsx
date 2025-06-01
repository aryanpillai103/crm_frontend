import React, { useState, useEffect } from 'react';
import { campaignApi } from '../../campaigns/api/CampaignApi';
import { useNavigate } from 'react-router-dom';
import customerApi from '../../customers/api/CustomerApi'

export default function HomePage() {
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
          conversionRate: 32.5, // This would come from your analytics API
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

  if (isLoading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="home-page">
      <header className="dashboard-header">
        <h1>CRM Dashboard</h1>
        <div className="quick-actions">
          <button onClick={() => navigate('/customers/new')}>Add Customer</button>
          <button onClick={() => navigate('/campaigns/new')}>Create Campaign</button>
          <button onClick={() => navigate('/segments/new')}>Build Segment</button>
        </div>
      </header>

      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Total Customers</h3>
          <p className="metric-value">{stats.totalCustomers}</p>
          <p className="metric-trend">↑ 12% from last month</p>
        </div>
        
        <div className="metric-card">
          <h3>Active Campaigns</h3>
          <p className="metric-value">{stats.activeCampaigns}</p>
          <p className="metric-trend">3 launching soon</p>
        </div>
        
        <div className="metric-card">
          <h3>Conversion Rate</h3>
          <p className="metric-value">{stats.conversionRate}%</p>
          <p className="metric-trend">↓ 2.1% from average</p>
        </div>
        
        <div className="metric-card">
          <h3>Revenue Impact</h3>
          <p className="metric-value">$24,580</p>
          <p className="metric-trend">↑ 18% from last quarter</p>
        </div>
      </div>

      <div className="dashboard-content">
        <section className="recent-activity">
          <h2>Recent Activity</h2>
          <ul>
            {stats.recentActivity.map(activity => (
              <li key={activity.id}>
                <span className={`activity-badge ${activity.type}`}>{activity.type}</span>
                <span className="activity-text">
                  {activity.action} <strong>{activity.target}</strong> {activity.time}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="ai-recommendations">
          <h2>AI Recommendations</h2>
          <div className="recommendation-card">
            <p>🚀 <strong>Launch a re-engagement campaign</strong> for 142 inactive customers</p>
            <button>Create Campaign</button>
          </div>
          <div className="recommendation-card">
            <p>🎯 <strong>Create a segment</strong> of high-value customers for exclusive offers</p>
            <button>Build Segment</button>
          </div>
        </section>
      </div>
    </div>
  );
}