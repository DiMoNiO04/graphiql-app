import { IDocumentation } from '@/src/types/documentationTypes';
import React from 'react';
import { Box, Typography, Paper, Stack } from '@mui/material';

const Documentation: React.FC<IDocumentation> = ({ sdl }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Paper sx={{ padding: 2, maxHeight: 300, overflowY: 'auto' }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h6" component="h3" sx={{ flexShrink: 0, width: '150px' }}>
            Documentation
          </Typography>
          <Typography variant="h6" sx={{ color: 'grey' }}>
            {<pre>{sdl}</pre>}
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Documentation;
