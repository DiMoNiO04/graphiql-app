'use client';

import React, { useState } from 'react';
import { Box, Button, Stack, Tab, Tabs, Typography } from '@mui/material';

import ControlTabPanel from '../../../components/ControlTabPanel/ControlTabPanel';
import Documentation from '../../../components/Documentation/Documentation';
import QueryEditor from '../../../components/QueryEditor/QueryEditor';
import ResponseViewer from '../../../components/ResponseViewer/ResponseViewer';
import UrlEditorGraphi from '../../../components/UrlEditorGraphi/UrlEditorGraphi';
import VariablesEditor from '../../../components/VariablesEditor/VariablesEditor';
import { a11yProps } from '../../../lib/restClient/getAllyProps';
import RestClientHeaders from '../../../components/RestClient/RestClientHeaders';
import { useTranslations } from 'next-intl';
import { convertJson, getArr, isBrackets, prettierTextArea } from '../../../utils/prettifyUtils';
import { useHeaders } from '../../../contexts/HeaderContext';
import { Header } from '../../../types/headers';
import { buildClientSchema, getIntrospectionQuery, printSchema } from 'graphql';

const GraphiQlClient = () => {
  const t = useTranslations('MainPage');
  const [endpointUrl, setEndpointUrl] = useState('');
  const [sdlUrl, setSdlUrl] = useState('');
  const [response, setResponse] = useState('');
  const [isOpenDocumentation, setIsOpenDocumentation] = useState<boolean>(false);
  const [variables, setVariables] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [tabsValue, setTabsValue] = useState<number>(0);
  const [responseStatus, setResponseStatus] = useState<number | string | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { headers, setHeaders } = useHeaders();
  const [responseHeaders, setResponseHeaders] = useState<Record<string, string>>({});
  const [schema, setSchema] = useState('');

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabsValue(newValue);
  };

  const handleSend = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const startTime = performance.now();
    try {
      const headersObject = headers.reduce((acc: Record<string, string>, header: Header) => {
        if (header.sent) {
          acc[header.key] = header.value;
        }
        return acc;
      }, {});
      const result = await fetch(`${endpointUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headersObject,
        },
        body: JSON.stringify({
          query: query,
          variables: variables === '' ? {} : JSON.parse(variables),
        }),
      });
      const response = await result?.json();
      const endTime = performance.now();
      setResponseTime(endTime - startTime);
      setResponseHeaders(response['headers']);
      setResponseStatus(result.status);
      setResponse(JSON.stringify(response, null, 2));
      setIsLoading(false);

      const res = await fetch(`${endpointUrl}?sdl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headersObject,
        },
        body: JSON.stringify({
          query: getIntrospectionQuery(),
        }),
      });

      const { data } = await res.json();
      setSchema(printSchema(buildClientSchema(data)));
      setIsOpenDocumentation(true);
      setIsLoading(false);
      if (!result.ok) setIsOpenDocumentation(false);
    } catch (error) {
      console.error('Error:', error);
      setResponse((error as Error).message);
      setResponseStatus(500);
      setResponseTime(null);
      setIsLoading(false);
      setIsOpenDocumentation(false);
    }
  };

  const prettierText = () => {
    if (query) {
      const arr = getArr(query);
      if (isBrackets(arr)) {
        setQuery(prettierTextArea(arr));
      }
    }
    if (variables) {
      setVariables(convertJson(variables));
    }
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
          {t('graphiQL-client')}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <UrlEditorGraphi
            url={endpointUrl}
            setUrl={setEndpointUrl}
            sdlUrl={endpointUrl !== '' ? `${endpointUrl}?sdl` : ''}
            setSdlUrl={setSdlUrl}
            onSendButtonClick={handleSend}
          />
          <Button
            variant="contained"
            onClick={prettierText}
            sx={{
              transition: 'all 0.4s ease',
              backgroundColor: '#000000',
              color: '#ffffff',
              marginTop: 3,
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
              <Typography marginLeft={1}>{t('prettierText')}</Typography>
            </Box>
          </Button>
          <Box sx={{ marginTop: '2rem' }}>
            <Tabs
              value={tabsValue}
              onChange={handleChangeTab}
              TabIndicatorProps={{ sx: { backgroundColor: '#F26B3A', height: 3, bottom: 2 } }}
            >
              <Tab label={t('headers')} {...a11yProps(0)} />
              <Tab label={t('query')} {...a11yProps(1)} />
              <Tab label={t('variables')} {...a11yProps(2)} />
            </Tabs>
            <ControlTabPanel value={tabsValue} index={0}>
              <RestClientHeaders />
            </ControlTabPanel>
            <ControlTabPanel value={tabsValue} index={1}>
              <QueryEditor value={query} onChange={setQuery} />
            </ControlTabPanel>
            <ControlTabPanel value={tabsValue} index={2}>
              <VariablesEditor value={variables} onChange={setVariables} />
            </ControlTabPanel>
            <Box sx={{ textAlign: 'right' }}></Box>
          </Box>
        </Box>
      </Stack>

      <Stack
        spacing={5}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '2rem 2.5rem 4rem 2.5rem',
        }}
      >
        <Typography variant="h4" component="h1" sx={{ textAlign: 'center' }}>
          {t('response')}
        </Typography>
        <ResponseViewer response={response} status={responseStatus} responseTime={responseTime} isLoading={isLoading} />
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
            {t('documentation')}
          </Typography>
          <Documentation schema={schema} />
        </Stack>
      )}
    </>
  );
};

export default GraphiQlClient;
