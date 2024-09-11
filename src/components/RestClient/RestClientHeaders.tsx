import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Trash2, CirclePlus } from 'lucide-react';
import { useHeaders } from '@/src/contexts/HeaderContext';
import { Checkbox } from '../ui/checkbox';
import { Header } from '@/src/types/headers';
import toast from 'react-hot-toast';

const RestClientHeaders = () => {
  const { headers, setHeaders } = useHeaders();
  const [isChecked, setIsChecked1] = useState(false);

  const protectedKeys = ['Accept', 'Content-Type', 'Accept-Language', 'Cache-Control'];

  const onRemoveItem = (itemToRemove: Header) => {
    if (protectedKeys.includes(itemToRemove.key)) {
      toast.error(`Cannot delete protected header: ${itemToRemove.key}`);
      return;
    }
    setHeaders(headers.filter((header) => header !== itemToRemove));
  };
  const onAddHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const onHeaderChange = (index: number, field: 'key' | 'value', newValue: string) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index] = { ...updatedHeaders[index], [field]: newValue };
    setHeaders(updatedHeaders);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        {headers.map((header, index) => {
          return (
            <div className="flex gap-2 max-w-[700px] w-full" key={index}>
              <div className="flex gap-3 w-full items-center">
                <Checkbox checked={true} />
                <Input
                  type="text"
                  placeholder="Header Key"
                  value={header.key}
                  onChange={(e) => onHeaderChange(index, 'key', e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Header Value"
                  value={header.value}
                  onChange={(e) => onHeaderChange(index, 'value', e.target.value)}
                />
              </div>
              <button
                className="rounded-md flex items-center hover:bg-[#18181B]/80 transition-all duration-300 ease-in-out hover:text-white p-2"
                onClick={() => onRemoveItem(header)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          );
        })}
      </div>
      <button
        className="bg-[#18181B] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#18181B]/80 transition-all duration-300 w-fit"
        onClick={onAddHeader}
      >
        <CirclePlus size={18} />
        Add Header
      </button>
    </div>
  );
};

export default RestClientHeaders;
