import React from 'react';
import RestClientSelectMethod from './RestClientSelectMethod';
import { Input } from '@/src/components/ui/input';
import { Send } from 'lucide-react';

const RestClientRequestHeader = () => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">New Api Request</h1>
      <div className="flex gap-3">
        <RestClientSelectMethod />
        <Input type="tex" placeholder="Enter Api endpoint URL" />
        <button className="bg-[#18181B] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#18181B]/80 transition-all duration-300">
          <Send size={16} />
          Send
        </button>
      </div>
    </div>
  );
};

export default RestClientRequestHeader;
