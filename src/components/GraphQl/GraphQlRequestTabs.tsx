import React, { useState } from 'react';
import LineTabs from './../../../src/components/ui/Tabs';
import { motion, AnimatePresence } from 'framer-motion';
import RestClientHeaders from '../RestClient/RestClientHeaders';
import QueryEditor from '../QueryEditor/QueryEditor';
import ClientParams from '../RestAndGraphQl/ClientParams';
import VariablesEditor from '../VariablesEditor/VariablesEditor';

const GraphQLRequestTabs = ({
  query,
  setQuery,
  variables,
  setVariables,
  prettierText,
  setUrl,
  url,
}: {
  query: string;
  setQuery: (query: string) => void;
  variables: string;
  setVariables: (variables: string) => void;
  prettierText: () => void;
  setUrl: (url: string) => void;
  url: string;
}) => {
  const tabs = ['Headers', 'Query', 'Params', 'Variables'];
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
      <LineTabs onTabChange={handleTabChange} tabs={tabs} prettierText={prettierText} />
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
          {selectedTab === 'Params' && <ClientParams setUrl={setUrl} url={url} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default GraphQLRequestTabs;
