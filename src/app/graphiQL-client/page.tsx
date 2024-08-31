'use client';

import UrlEditorGraphi from '@/src/components/UrlEditorGraphi/UrlEditorGraphi';
import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';

const GraphiQlClient = () => {
  const [endpointUrl, setEndpointUrl] = useState<string>('');
  const [sdlUrl, setSdlUrl] = useState<string>('');

  return (
    <Stack
      spacing={5}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '4rem 2.5rem',
      }}
    >
      <Typography variant="h4" component="h1" sx={{ textAlign: 'center' }}>
        GraphiQL Client
      </Typography>
      <Box>
        <UrlEditorGraphi
          endpointUrl={endpointUrl}
          onEndpointUrlChange={setEndpointUrl}
          sdlUrl={sdlUrl}
          onSdlUrlChange={setSdlUrl}
        />
      </Box>
    </Stack>
  );
};

export default GraphiQlClient;
