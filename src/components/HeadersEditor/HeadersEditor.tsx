import { IHeadersEditor } from '@/src/types/headersEditorTypes';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const HeadersEditor: React.FC<IHeadersEditor> = ({ headers, onChange }) => {
  const updateHeader = (index: number, key: string, value: string) => {
    const newHeaders = [...headers];
    newHeaders[index] = { key, value };
    onChange(newHeaders);
  };

  const addHeader = () => {
    onChange([...headers, { key: '', value: '' }]);
  };

  const removeHeader = (index: number) => {
    const newHeaders = headers.filter((_, i) => i !== index);
    onChange(newHeaders);
  };

  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="end">
        <Stack direction="column" spacing={2} alignItems="end">
          {headers.map((header, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TextField
                label="Key"
                value={header.key}
                onChange={(e) => updateHeader(index, e.target.value, header.value)}
                variant="outlined"
                size="small"
                fullWidth
                sx={{
                  mr: 2,
                }}
              />
              <TextField
                label="Value"
                value={header.value}
                onChange={(e) => updateHeader(index, header.key, e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
                sx={{
                  mr: 2,
                }}
              />
              <DeleteIcon
                color="error"
                onClick={() => removeHeader(index)}
                sx={{
                  mr: 3,
                  '&:hover': { cursor: 'pointer', opacity: 0.6 },
                }}
              />
            </Box>
          ))}
        </Stack>
        <Button
          variant="contained"
          onClick={addHeader}
          sx={{
            transition: 'all 0.4s ease',
            backgroundColor: '#000000',
            color: '#ffffff',
            margin: '1.5rem 0',
            display: 'flex',
            flexShrink: 0,
            width: 175,
            alignSelf: 'flex-end',
            '&:hover': {
              color: '#000000',
              backgroundColor: '#ffffff',
            },
          }}
        >
          <Box sx={{ alignItems: 'center', display: 'flex' }}>
            <AddIcon />
            <Typography marginLeft={1}>Add header</Typography>
          </Box>
        </Button>
      </Stack>
    </Box>
  );
};

export default HeadersEditor;
