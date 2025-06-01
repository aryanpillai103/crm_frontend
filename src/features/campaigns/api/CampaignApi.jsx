import api from '../../../lib/api';


const API_URL = import.meta.env.VITE_API_URL;

export const campaignApi = {
  getCampaigns: async () => {
    const response = await fetch(`${API_URL}/campaigns`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.json();
  },

  createCampaign: async (campaignData) => {
    const response = await fetch(`${API_URL}/campaigns`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(campaignData)
    });
    return response.json();
  },

  getCampaignStats: async (campaignId) => {
    const response = await fetch(`${API_URL}/campaigns/${campaignId}/stats`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.json();
  },
  getCampaignComparisons: async () => {
    const response = await api.get('/campaigns/comparisons');
    return response.data;
  },
  getCustomerInsights: async (customerId) => {
    const response = await api.get(`/${customerId}/insights`);
    return response.data;
  },

};