'use client';

import BodyEditor from '@/src/components/BodyEditor/BodyEditor';
import CustomTabPanel from '@/src/components/CustomTabPanel/CustomTabPanel';
import HeadersEditor from '@/src/components/HeadersEditor/HeadersEditor';
import Response from '@/src/components/Response/Response';
import UrlEditor from '@/src/components/UrlEditor.tsx/UrlEditor';
import { a11yProps } from '@/src/lib/restClient/getAllyProps';
import { Box, Tabs, Tab, Stack } from '@mui/material';
import { useState } from 'react';

const RestClient = () => {
  const [value, setValue] = useState(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
      <UrlEditor />
      <Box>
        <Tabs
          value={value}
          onChange={handleChangeTab}
          TabIndicatorProps={{ sx: { backgroundColor: '#F26B3A', height: 3, bottom: 2 } }}
        >
          <Tab label="Headers" {...a11yProps(0)} />
          <Tab label="Body" {...a11yProps(1)} />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          <HeadersEditor />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <BodyEditor />
        </CustomTabPanel>
      </Box>
      <Response />
    </Stack>
  );
};

export default RestClient;
