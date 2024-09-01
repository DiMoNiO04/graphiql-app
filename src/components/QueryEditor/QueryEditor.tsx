import { IGraphiEditor } from '@/src/types/graphiEditorTypes';
import { TextField } from '@mui/material';
import React from 'react';

const QueryEditor: React.FC<IGraphiEditor> = ({ value, onChange }) => {
  return (
    <TextField
      label="GraphQL Query"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      multiline
      rows={5}
      fullWidth
      margin="normal"
    />
  );
};

export default QueryEditor;
