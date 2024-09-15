import React, { useState } from 'react';
import LineTabs from './../../../src/components/ui/Tabs';
import { motion, AnimatePresence } from 'framer-motion';
import RestClientHeaders from '../RestClient/RestClientHeaders';
import QueryEditor from '../QueryEditor/QueryEditor';
import ClientParams from '../RestAndGraphQl/ClientParams';
import VariablesEditor from '../VariablesEditor/VariablesEditor';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('MainPage');
  const tabs = [t('headers'), t('query'), t('params'), t('variables')];
  const [selectedTab, setSelectedTab] = useState(t('headers'));
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
          {selectedTab === t('headers') && <RestClientHeaders />}
          {selectedTab === t('query') && <QueryEditor value={query} onChange={setQuery} />}
          {selectedTab === t('variables') && <VariablesEditor value={variables} onChange={setVariables} />}
          {selectedTab === t('params') && <ClientParams setUrl={setUrl} url={url} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default GraphQLRequestTabs;
