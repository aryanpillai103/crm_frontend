import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { campaignApi } from '../api/campaignApi';

export default function CampaignStats({ campaignId }) {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await campaignApi.getCampaignStats(campaignId);
        setStats(data);
      } catch (error) {
        console.error('Failed to load stats:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, [campaignId]);

  if (isLoading) return <div>Loading...</div>;
  if (!stats) return <div>No data available</div>;

  return (
    <div className="campaign-stats">
      <h3>Campaign Performance</h3>
      
      <div className="stat-cards">
        <div className="stat-card">
          <h4>Delivered</h4>
          <p>{stats.delivered}</p>
        </div>
        <div className="stat-card">
          <h4>Opened</h4>
          <p>{stats.opened} ({stats.openRate}%)</p>
        </div>
        <div className="stat-card">
          <h4>Clicks</h4>
          <p>{stats.clicks} ({stats.clickRate}%)</p>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.performanceByDay}>
            <Bar dataKey="opens" fill="#8884d8" />
            <Bar dataKey="clicks" fill="#82ca9d" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}