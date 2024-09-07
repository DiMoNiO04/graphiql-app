import React from 'react';
import { Input } from '../ui/input';
import { Trash2, CirclePlus } from 'lucide-react';
import { useHeaders } from '@/src/contexts/HeaderContext';
const RestClientHeaders = () => {
  const { headers, setHeaders } = useHeaders();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        {headers.map((header, index) => {
          return (
            <div className="flex gap-2 max-w-[700px] w-full" key={index}>
              <div className="flex gap-3 w-full">
                <Input type="text" placeholder="Header Key" value={header.key} />
                <Input type="text" placeholder="Header Value" value={header.value} />
              </div>
              <button className="rounded-md flex items-center hover:bg-[#18181B]/80 transition-all duration-300 ease-in-out hover:text-white p-2">
                <Trash2 size={16} />
              </button>
            </div>
          );
        })}
      </div>
      <button className="bg-[#18181B] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#18181B]/80 transition-all duration-300 w-fit">
        <CirclePlus size={18} />
        Add Header
      </button>
    </div>
  );
};

export default RestClientHeaders;
