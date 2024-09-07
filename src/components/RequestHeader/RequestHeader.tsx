import Checkbox from '@mui/material/Checkbox';
import { Box, Stack, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { RequestHeaderProps } from '@/src/types/headers';

const RequestHeader = ({ setHeaders, headers }: RequestHeaderProps) => {
  return (
    <Stack direction="column" spacing={2} sx={{ marginTop: 1, maxWidth: 700 }}>
      {headers.map((header, index) => (
        <Box key={index} sx={{ alignItems: 'center', display: 'flex', columnGap: 2 }}>
          <Box sx={{ alignItems: 'center', display: 'flex' }}>
            <Checkbox />
          </Box>
          <TextField
            label="Header Key"
            variant="outlined"
            size="small"
            fullWidth
            value={header.key}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Header value"
            variant="outlined"
            size="small"
            fullWidth
            value={header.value}
            InputProps={{ readOnly: header.value !== '' }}
          />
        </Box>
      ))}
    </Stack>
  );
};

export default RequestHeader;
