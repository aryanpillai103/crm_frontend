import React, { useState, useEffect } from 'react';
import CampaignStats from '../../campaigns/components/CampagnStats';
import { campaignApi } from '../../campaigns/api/CampaignApi';

export default function DashboardHome() {
  const [activeCampaigns, setActiveCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setIsLoading(true);
        const data = await campaignApi.getCampaigns();
        setActiveCampaigns(data);
        if (data.length > 0) setSelectedCampaign(data[0].id);
      } catch (error) {
        console.error('Failed to load campaigns:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Campaign Analytics</h2>
            <p className="text-gray-600 mt-1">
              Track and analyze your marketing campaign performance
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <select
              value={selectedCampaign || ''}
              onChange={(e) => setSelectedCampaign(e.target.value)}
              className="block w-full md:w-64 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white py-2 px-3 border text-sm"
              disabled={isLoading || activeCampaigns.length === 0}
            >
              {isLoading ? (
                <option>Loading campaigns...</option>
              ) : activeCampaigns.length === 0 ? (
                <option>No campaigns available</option>
              ) : (
                activeCampaigns.map(campaign => (
                  <option key={campaign.id} value={campaign.id}>
                    {campaign.name} ({new Date(campaign.createdAt).toLocaleDateString()})
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        {/* Main Content */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            {selectedCampaign ? (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <CampaignStats campaignId={selectedCampaign} />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
                No campaign selected or available
              </div>
            )}

            {/* Comparison Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Performance vs Previous Campaigns
              </h3>
              <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-500">
                {/* Placeholder for comparison charts */}
                <p>Comparison charts will be displayed here</p>
                <div className="mt-4 h-64 flex items-center justify-center bg-gray-200 rounded">
                  <span className="text-gray-400">Chart Visualization Area</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}