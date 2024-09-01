import { IHeadersEditor } from '@/src/types/headersEditorTypes';
import { Box, Button, Stack, TextField } from '@mui/material';
import React from 'react';

const HeadersEditor: React.FC<IHeadersEditor> = ({ headers, onChange }) => {
  const updateHeader = (index: number, key: string, value: string) => {
    const newHeaders = [...headers];
    newHeaders[index] = { key, value };
    onChange(newHeaders);
  };

  const addHeader = () => {
    onChange([...headers, { key: '', value: '' }]);
  };

  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="end">
        <Stack direction="column" spacing={2} alignItems="center">
          {headers.map((header, index) => (
            <Box key={index} sx={{ display: 'flex', mb: 2 }}>
              <TextField
                label="Key"
                value={header.key}
                onChange={(e) => updateHeader(index, e.target.value, header.value)}
                sx={{
                  height: 40,
                  mr: 2,
                  '.MuiInputBase-root': {
                    height: 40,
                  },
                }}
              />
              <TextField
                label="Value"
                value={header.value}
                onChange={(e) => updateHeader(index, header.key, e.target.value)}
                sx={{
                  height: 40,
                  '.MuiInputBase-root': {
                    height: 40,
                  },
                }}
              />
            </Box>
          ))}
        </Stack>
        <Button onClick={addHeader} variant="contained" sx={{ mt: 2, backgroundColor: '#000000', color: '#ffffff' }}>
          Add Header
        </Button>
      </Stack>
    </Box>
  );
};

export default HeadersEditor;
