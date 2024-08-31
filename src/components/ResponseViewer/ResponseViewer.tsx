import { IResponseViewer } from '@/src/types/responseViewerTypes';
import { Box, Paper, Stack, Typography } from '@mui/material';
import React from 'react';

const ResponseViewer: React.FC<IResponseViewer> = ({ response, status }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Paper sx={{ padding: 2, overflowY: 'auto' }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h6" component="h3" sx={{ flexShrink: 0, width: '150px' }}>
            Status
          </Typography>
          <Typography variant="h6" sx={{ color: 'grey' }}>
            {status}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h6" component="h3" sx={{ flexShrink: 0, width: '150px' }}>
            Body
          </Typography>
          <Typography variant="h6" sx={{ color: 'grey' }}>
            {<pre>{JSON.stringify(response, null, 2)}</pre>}
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ResponseViewer;
