import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import RuleGroup from './RuleGroup';

export default function SegmentBuilder() {
  const [rules, setRules] = useState([]);
  const [segmentName, setSegmentName] = useState('');
  const [previewCount, setPreviewCount] = useState(0);

  const addRule = (newRule) => {
    setRules([...rules, newRule]);
  };

  const previewSegment = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/segments/preview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ rules })
      });
      const data = await response.json();
      setPreviewCount(data.count);
    } catch (error) {
      console.error('Preview failed:', error);
    }
  };

  const saveSegment = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/segments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name: segmentName, rules })
      });
      alert('Segment saved successfully!');
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Segment Builder</Typography>
      
      <input
        type="text"
        placeholder="Segment Name"
        value={segmentName}
        onChange={(e) => setSegmentName(e.target.value)}
        style={{ margin: '16px 0', padding: '8px' }}
      />
      
      <RuleGroup onAddRule={addRule} />
      
      <div style={{ margin: '16px 0' }}>
        <Button variant="contained" onClick={previewSegment} sx={{ mr: 2 }}>
          Preview Audience ({previewCount})
        </Button>
        <Button variant="contained" onClick={saveSegment}>
          Save Segment
        </Button>
      </div>
    </Box>
  );
}