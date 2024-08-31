'use client';

import NavigationGraphiPanel from '@/src/components/NavigationGraphiPanel/NavigationGraphiPanel';
import UrlEditorGraphi from '@/src/components/UrlEditorGraphi/UrlEditorGraphi';
import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';

const GraphiQlClient = () => {
  const [endpointUrl, setEndpointUrl] = useState<string>('');
  const [sdlUrl, setSdlUrl] = useState<string>('');

  const handleSend = () => {
    console.log('send query');
  };

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
      <Box sx={{ marginBottom: '4rem' }}>
        <UrlEditorGraphi
          endpointUrl={endpointUrl}
          onEndpointUrlChange={setEndpointUrl}
          sdlUrl={sdlUrl}
          onSdlUrlChange={setSdlUrl}
        />
        <NavigationGraphiPanel />
        <Button
          onClick={handleSend}
          variant="contained"
          sx={{
            marginTop: 2,
            width: 200,
            transition: 'all 0.4s ease',
            backgroundColor: 'black',
            color: 'white',
            '&:hover': {
              color: 'black',
              backgroundColor: 'white',
            },
          }}
        >
          Send
        </Button>
      </Box>
    </Stack>
  );
};

export default GraphiQlClient;
