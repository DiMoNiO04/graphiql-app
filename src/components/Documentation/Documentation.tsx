import { IDocumentation } from '@/src/types/documentationTypes';
import React from 'react';
import { Box, Typography, Paper, Stack, TextField } from '@mui/material';

const Documentation: React.FC<IDocumentation> = ({ schema }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Paper sx={{ padding: 2, maxHeight: 300, overflowY: 'auto' }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h6" component="h3" sx={{ flexShrink: 0, width: '150px' }}>
            Documentation
          </Typography>
          <TextField sx={{ width: '100%' }} multiline value={schema} />
        </Stack>
      </Paper>
    </Box>
  );
};

export default Documentation;
