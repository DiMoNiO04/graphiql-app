import { IGraphiEditor } from '@/src/types/graphiEditorTypes';
import { TextField } from '@mui/material';
import React from 'react';

const VariablesEditor: React.FC<IGraphiEditor> = ({ value, onChange }) => {
  return (
    <TextField
      label="Variables"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      multiline
      rows={5}
      fullWidth
      margin="normal"
    />
  );
};

export default VariablesEditor;
