import React, { useState, useEffect } from 'react';
import CampaignStats from '../../campaigns/components/CampagnStats';
import { campaignApi } from '../../campaigns/api/CampaignApi';

export default function DashboardHome() {
  const [activeCampaigns, setActiveCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await campaignApi.getCampaigns();
        setActiveCampaigns(data);
        if (data.length > 0) setSelectedCampaign(data[0].id);
      } catch (error) {
        console.error('Failed to load campaigns:', error);
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <div className="dashboard-home">
      <h2>Campaign Analytics</h2>
      
      <select 
        value={selectedCampaign || ''}
        onChange={(e) => setSelectedCampaign(e.target.value)}
        className="campaign-selector"
      >
        {activeCampaigns.map(campaign => (
          <option key={campaign.id} value={campaign.id}>
            {campaign.name} ({new Date(campaign.createdAt).toLocaleDateString()})
          </option>
        ))}
      </select>

      {selectedCampaign && (
        <CampaignStats campaignId={selectedCampaign} />
      )}

      <div className="comparison-section">
        <h3>Performance vs Previous Campaigns</h3>
        {/* Comparison charts would go here */}
      </div>
    </div>
  );
}