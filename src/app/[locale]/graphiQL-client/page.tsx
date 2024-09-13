'use client';

import React, { useState } from 'react';
import { Box, Button, Stack, Tab, Tabs, Typography } from '@mui/material';

import ControlTabPanel from '@/src/components/ControlTabPanel/ControlTabPanel';
import Documentation from '@/src/components/Documentation/Documentation';
import HeadersEditor from '@/src/components/HeadersEditor/HeadersEditor';
import QueryEditor from '@/src/components/QueryEditor/QueryEditor';
import ResponseViewer from '@/src/components/ResponseViewer/ResponseViewer';
import UrlEditorGraphi from '@/src/components/UrlEditorGraphi/UrlEditorGraphi';
import VariablesEditor from '@/src/components/VariablesEditor/VariablesEditor';
import { a11yProps } from '@/src/lib/restClient/getAllyProps';
import { IHeaderProp } from '@/src/types/headersEditorTypes';

const GraphiQlClient = () => {
  const [endpointUrl, setEndpointUrl] = useState<string>('');
  const [sdlUrl, setSdlUrl] = useState<string>('');
  const [response, setResponse] = useState<unknown>();
  const [status, setStatus] = useState<number>();
  const [isOpenDocumentation, setIsOpenDocumentation] = useState<boolean>(false);
  const [variables, setVariables] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [tabsValue, setTabsValue] = useState<number>(0);
  const [headers, setHeaders] = useState<IHeaderProp[]>([]);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabsValue(newValue);
  };

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
          <Box sx={{ marginTop: '2rem' }}>
            <Tabs
              value={tabsValue}
              onChange={handleChangeTab}
              TabIndicatorProps={{ sx: { backgroundColor: '#F26B3A', height: 3, bottom: 2 } }}
            >
              <Tab label="Headers" {...a11yProps(0)} />
              <Tab label="Query" {...a11yProps(1)} />
              <Tab label="Variables" {...a11yProps(2)} />
            </Tabs>
            <ControlTabPanel value={tabsValue} index={0}>
              <HeadersEditor headers={headers} onChange={setHeaders} />
            </ControlTabPanel>
            <ControlTabPanel value={tabsValue} index={1}>
              <QueryEditor value={query} onChange={setQuery} />
            </ControlTabPanel>
            <ControlTabPanel value={tabsValue} index={2}>
              <VariablesEditor value={variables} onChange={setVariables} />
            </ControlTabPanel>
          </Box>
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
