import React, { useState } from 'react';
import LineTabs from '@/src/components/ui/Tabs';
import { motion, AnimatePresence } from 'framer-motion';
import RestClientHeaders from './RestClientHeaders';
import RestClientRequestEditor from './RestClientRequestEditor';
import { useTranslations } from 'next-intl';
import ClientParams from '../RestAndGraphQl/ClientParams';

const RestClientRequestTabs = ({
  setRequestBody,
  requestBody,
  setUrl,
  url,
}: {
  setRequestBody: (body: string) => void;
  requestBody: string;
  setUrl: (url: string) => void;
  url: string;
}) => {
  const t = useTranslations('MainPage');
  const tabs = [t('headers'), t('tab-body'), 'Params'];
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
          {selectedTab === t('headers') && <RestClientHeaders />}
          {selectedTab === t('tab-body') && (
            <RestClientRequestEditor setRequestBody={setRequestBody} requestBody={requestBody} />
          )}
          {selectedTab === 'Params' && <ClientParams setUrl={setUrl} url={url} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RestClientRequestTabs;
