const API_URL = import.meta.env.VITE_API_URL;

export const segmentApi = {
  getSegments: async () => {
    const response = await fetch(`${API_URL}/segments`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.json();
  },

  previewSegment: async (rules) => {
    const response = await fetch(`${API_URL}/segments/preview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ rules })
    });
    return response.json();
  },

  createSegment: async (segmentData) => {
    const response = await fetch(`${API_URL}/segments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(segmentData)
    });
    return response.json();
  }
};