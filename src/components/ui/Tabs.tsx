'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

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
}

const LineTabs = ({ center, customID, onTabChange, tabs }: LineTabProps) => {
  const [selected, setSelected] = useState<string>(tabs[0]);

  const handleTabChange = (tab: string) => {
    setSelected(tab);
    onTabChange(tab);
  };

  return (
    <div className={cn('mb-8 flex flex-wrap items-center gap-2 border-b border-input', center && 'justify-center')}>
      {tabs.map((tab) => (
        <Tab text={tab} selected={selected === tab} setSelected={handleTabChange} key={tab} customID={customID} />
      ))}
    </div>
  );
};

export default LineTabs;
