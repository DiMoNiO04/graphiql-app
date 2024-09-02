'use client';

import BodyEditor from '@/src/components/BodyEditor/BodyEditor';
import ControlTabPanel from '@/src/components/ControlTabPanel/ControlTabPanel';
import ResponseEditor from '@/src/components/ResponseEditor/ResponseEditor';
import UrlEditor from '@/src/components/UrlEditor.tsx/UrlEditor';
import { a11yProps } from '@/src/lib/restClient/getAllyProps';
import { Box, Tabs, Tab, Stack, Button, Typography } from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RequestHeader from '@/src/components/RequestHeader/RequestHeader';
import { getFetchData } from '../actions/getFetchData';
import { postFetchData } from '../actions/postFetchData';
import { decodeBase64, encodeBase64 } from '@/src/utils/base64';

const RestClient = () => {
  const [value, setValue] = useState(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // REST Client
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState('');

  const onSendButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Url: ', url);
    console.log('Request Body: ', requestBody);
    console.log('Method: ', method);
    e.preventDefault();

    let result;

    try {
      switch (method) {
        case 'GET':
          const encodedGETUrl = encodeBase64(url);
          result = await getFetchData(encodedGETUrl);
          break;
        case 'POST':
          const encodedPOSTUrl = encodeBase64(url);
          const encodedRequestBody = encodeBase64(requestBody);
          result = await postFetchData(encodedPOSTUrl, encodedRequestBody);
        default:
          console.error('Unsupported HTTP method');
      }

      setResponse(result || '');
      console.log('Response:', result);
    } catch (error) {
      console.error('Error:', error);
      setResponse((error as Error).message);
    }
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
      <UrlEditor
        method={method}
        setMethod={setMethod}
        url={url}
        setUrl={setUrl}
        onSendButtonClick={onSendButtonClick}
      />
      <Box>
        <Tabs
          value={value}
          onChange={handleChangeTab}
          TabIndicatorProps={{ sx: { backgroundColor: '#F26B3A', height: 3, bottom: 2 } }}
        >
          <Tab label="Headers" {...a11yProps(0)} />
          <Tab label="Body" {...a11yProps(1)} />
        </Tabs>
        <ControlTabPanel value={value} index={0}>
          <RequestHeader />
          <Button
            variant="contained"
            sx={{
              transition: 'all 0.4s ease',
              backgroundColor: '#000000',
              color: '#ffffff',
              margin: '1.5rem 0',
              display: 'flex',
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
        </ControlTabPanel>
        <ControlTabPanel value={value} index={1}>
          <BodyEditor setRequestBody={setRequestBody} requestBody={requestBody} />
        </ControlTabPanel>
      </Box>
      <ResponseEditor response={response} />
    </Stack>
  );
};

export default RestClient;
