import React, { useState } from 'react';
import LineTabs from '@/src/components/ui/Tabs';
import { motion, AnimatePresence } from 'framer-motion';
const RestClientTabs = () => {
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
      <LineTabs onTabChange={handleTabChange} />
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTab}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={contentVariants}
          transition={{ duration: 0.15, ease: 'easeInOut' }}
        >
          {selectedTab === 'Headers' && 'Headers'}
          {selectedTab === 'Body' && 'Body'}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RestClientTabs;
