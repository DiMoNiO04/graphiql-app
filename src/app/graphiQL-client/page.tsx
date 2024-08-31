'use client';

import Documentation from '@/src/components/Documentation/Documentation';
import NavigationGraphiPanel from '@/src/components/NavigationGraphiPanel/NavigationGraphiPanel';
import ResponseViewer from '@/src/components/ResponseViewer/ResponseViewer';
import UrlEditorGraphi from '@/src/components/UrlEditorGraphi/UrlEditorGraphi';
import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';

const GraphiQlClient = () => {
  const [endpointUrl, setEndpointUrl] = useState<string>('');
  const [sdlUrl, setSdlUrl] = useState<string>('');
  const [response, setResponse] = useState<unknown>();
  const [status, setStatus] = useState<number>();
  const [isOpenDocumentation, setIsOpenDocumentation] = useState<boolean>(false);

  const handleSend = () => {
    console.log('send query');
  };

  return (
    <>
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
          Response
        </Typography>
        <ResponseViewer response={response} status={status} />
      </Stack>

      {isOpenDocumentation && (
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
            Documentation
          </Typography>
          <Documentation sdl={sdlUrl} />
        </Stack>
      )}
    </>
  );
};

export default GraphiQlClient;
