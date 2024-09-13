import React, { useState } from 'react';
import LineTabs from '@/src/components/ui/Tabs';
import { motion, AnimatePresence } from 'framer-motion';
import RestClientHeaders from './RestClientHeaders';
import RestClientRequestEditor from './RestClientRequestEditor';
const RestClientRequestTabs = ({
  setRequestBody,
  requestBody,
}: {
  setRequestBody: (body: string) => void;
  requestBody: string;
}) => {
  const tabs = ['Headers', 'Body'];
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
          {selectedTab === 'Body' && (
            <RestClientRequestEditor setRequestBody={setRequestBody} requestBody={requestBody} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RestClientRequestTabs;
