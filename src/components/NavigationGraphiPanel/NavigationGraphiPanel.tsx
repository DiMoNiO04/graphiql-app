import React, { useState } from 'react';
import { a11yProps } from '@/src/lib/restClient/getAllyProps';
import ControlTabPanel from '@/src/components/ControlTabPanel/ControlTabPanel';
import { Box, Tab, Tabs } from '@mui/material';

const NavigationGraphiPanel: React.FC = () => {
  const [tabsValue, setTabsValue] = useState<number | null>(null);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabsValue(newValue);
  };

  return (
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
        Headers Editor
      </ControlTabPanel>
      <ControlTabPanel value={tabsValue} index={1}>
        Query Editor
      </ControlTabPanel>
      <ControlTabPanel value={tabsValue} index={2}>
        Variables Editor
      </ControlTabPanel>
    </Box>
  );
};

export default NavigationGraphiPanel;
