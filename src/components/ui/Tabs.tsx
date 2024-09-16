'use client';
import { cn } from './../../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface TabProps {
  text: string;
  selected: boolean;
  setSelected: (text: string) => void;
  customID?: string;
}

const Tab = ({ text, selected, setSelected, customID }: TabProps) => {
  const [width, setWidth] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (textRef.current) {
      setWidth(textRef.current.offsetWidth);
    }
  }, [text]);

  return (
    <button
      onClick={() => setSelected(text)}
      className="
        relative rounded-md px-2 py-4 pt-2 text-sm font-medium text-gray-500 transition-colors duration-300 
      "
    >
      <span
        ref={textRef}
        className={`relative z-10 duration-300 ease-in-out transition-colors text-base ${
          selected ? 'text-black' : 'text-black/50'
        }`}
      >
        {text}
      </span>

      {selected && (
        <motion.div
          className="absolute left-0 bottom-0 h-[2px] bg-black"
          layoutId={customID + 'linetab'}
          initial={{ width: 0 }}
          animate={{ width }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </button>
  );
};

interface LineTabProps {
  center?: boolean;
  customID?: string;
  onTabChange: (tab: string) => void;
  tabs: string[];
  prettierText?: () => void;
}

const LineTabs = ({ center, customID, onTabChange, tabs, prettierText }: LineTabProps) => {
  const t = useTranslations('MainPage');
  const buttonOnTabs = [t('query'), t('variables')];
  const [selected, setSelected] = useState<string>(tabs[0]);

  const handleTabChange = (tab: string) => {
    setSelected(tab);
    onTabChange(tab);
  };

  return (
    <>
      <div className="relative ">
        <AnimatePresence>
          {buttonOnTabs.includes(selected) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="bg-[#18181B] text-white px-5 py-2 rounded-md flex items-center gap-3 hover:bg-[#18181B]/80 transition-all duration-300 w-fit text-center justify-center absolute top-1/2 -translate-y-1/2 right-0"
                onClick={prettierText}
              >
                Prettier
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <div className={cn('mb-8 flex flex-wrap items-center gap-2 border-b border-input', center && 'justify-center')}>
          {tabs.map((tab) => (
            <Tab text={tab} selected={selected === tab} setSelected={handleTabChange} key={tab} customID={customID} />
          ))}
        </div>
      </div>
    </>
  );
};

export default LineTabs;
