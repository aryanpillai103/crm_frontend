import React, { useState } from 'react';
import { Select, MenuItem, TextField } from '@mui/material';

const ruleTypes = [
  { value: 'spend', label: 'Total Spend' },
  { value: 'lastPurchase', label: 'Days Since Last Purchase' },
  { value: 'location', label: 'Location' }
];

const operators = {
  spend: ['>', '<', '='],
  lastPurchase: ['>', '<', '='],
  location: ['equals', 'contains']
};

export default function RuleGroup({ onAddRule }) {
  const [selectedType, setSelectedType] = useState('');
  const [selectedOp, setSelectedOp] = useState('');
  const [value, setValue] = useState('');

  const handleAdd = () => {
    if (selectedType && selectedOp && value) {
      onAddRule({
        type: selectedType,
        operator: selectedOp,
        value
      });
      setSelectedType('');
      setSelectedOp('');
      setValue('');
    }
  };

  return (
    <div style={{ margin: '16px 0' }}>
      <Select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        displayEmpty
        sx={{ mr: 2 }}
      >
        <MenuItem value="">Select Rule Type</MenuItem>
        {ruleTypes.map((type) => (
          <MenuItem key={type.value} value={type.value}>
            {type.label}
          </MenuItem>
        ))}
      </Select>

      {selectedType && (
        <Select
          value={selectedOp}
          onChange={(e) => setSelectedOp(e.target.value)}
          sx={{ mr: 2 }}
        >
          {operators[selectedType].map((op) => (
            <MenuItem key={op} value={op}>
              {op}
            </MenuItem>
          ))}
        </Select>
      )}

      {selectedOp && (
        <TextField
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          sx={{ mr: 2 }}
        />
      )}

      <button onClick={handleAdd}>Add Rule</button>
    </div>
  );
}