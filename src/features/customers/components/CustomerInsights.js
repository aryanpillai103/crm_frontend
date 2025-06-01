import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function CustomerInsights({ customerId }) {
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/customers/${customerId}/insights`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        const data = await response.json();
        setInsights(data);
      } catch (error) {
        console.error('Failed to load insights:', error);
      }
    };
    fetchInsights();
  }, [customerId]);

  if (!insights) return <div>Loading insights...</div>;

  return (
    <div className="customer-insights">
      <h3>Customer Behavior</h3>
      
      <div className="insights-grid">
        <div className="insight-card">
          <h4>Purchase Frequency</h4>
          <p>{insights.purchaseFrequency} days between purchases</p>
        </div>
        
        <div className="insight-card">
          <h4>Average Order Value</h4>
          <p>${insights.avgOrderValue.toFixed(2)}</p>
        </div>
      </div>

      <div className="chart-container">
        <PieChart width={400} height={300}>
          <Pie
            data={insights.categoryDistribution}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {insights.categoryDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </div>
    </div>
  );
}