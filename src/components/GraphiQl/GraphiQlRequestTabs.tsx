import React, { useState } from 'react';
import LineTabs from '@/src/components/ui/Tabs';
import { motion, AnimatePresence } from 'framer-motion';
import RestClientHeaders from '../RestClient/RestClientHeaders';

import QueryEditor from '../QueryEditor/QueryEditor';
import VariablesEditor from '../VariablesEditor/VariablesEditor';

const GraphiQLRequestTabs = ({
  query,
  setQuery,
  variables,
  setVariables,
}: {
  query: string;
  setQuery: (query: string) => void;
  variables: string;
  setVariables: (variables: string) => void;
}) => {
  const tabs = ['Headers', 'Query', 'Variables'];
  const [selectedTab, setSelectedTab] = useState('Headers');
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
  return (
    <div>
      <LineTabs onTabChange={handleTabChange} tabs={tabs} />
      <AnimatePresence mode="wait">
        <motion.div
          className="pb-6"
          key={selectedTab}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={contentVariants}
          transition={{ duration: 0.15, ease: 'easeInOut' }}
        >
          {selectedTab === 'Headers' && <RestClientHeaders />}
          {selectedTab === 'Query' && <QueryEditor value={query} onChange={setQuery} />}
          {selectedTab === 'Variables' && <VariablesEditor value={variables} onChange={setVariables} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default GraphiQLRequestTabs;