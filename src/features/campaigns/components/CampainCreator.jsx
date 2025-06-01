import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Select, MenuItem } from '@mui/material';

export default function CampaignCreator() {
  const [campaign, setCampaign] = useState({
    name: '',
    segmentId: '',
    message: '',
    schedule: 'immediately'
  });
  const [segments, setSegments] = useState([]);
  const navigate = useNavigate();

  // Fetch segments on mount
  React.useEffect(() => {
    const fetchSegments = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/segments`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setSegments(data);
      } catch (error) {
        console.error('Error fetching segments:', error);
      }
    };
    fetchSegments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/campaigns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(campaign)
      });
      navigate('/campaigns');
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Campaign Name"
        fullWidth
        margin="normal"
        value={campaign.name}
        onChange={(e) => setCampaign({...campaign, name: e.target.value})}
      />

      <Select
        value={campaign.segmentId}
        onChange={(e) => setCampaign({...campaign, segmentId: e.target.value})}
        fullWidth
        displayEmpty
        sx={{ mt: 2 }}
      >
        <MenuItem value="">Select Segment</MenuItem>
        {segments.map((segment) => (
          <MenuItem key={segment.id} value={segment.id}>
            {segment.name} ({segment.customerCount} customers)
          </MenuItem>
        ))}
      </Select>

      <TextField
        label="Message"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        value={campaign.message}
        onChange={(e) => setCampaign({...campaign, message: e.target.value})}
      />

      <Select
        value={campaign.schedule}
        onChange={(e) => setCampaign({...campaign, schedule: e.target.value})}
        fullWidth
        sx={{ mt: 2 }}
      >
        <MenuItem value="immediately">Send Immediately</MenuItem>
        <MenuItem value="scheduled">Schedule for Later</MenuItem>
      </Select>

      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        Launch Campaign
      </Button>
    </form>
  );
}