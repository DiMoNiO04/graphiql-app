import React, { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { Trash2, CirclePlus } from 'lucide-react';
import { useHeaders } from '../../contexts/HeaderContext';
import { Checkbox } from '../ui/checkbox';
import { Header } from '../../types/headers';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';

const RestClientHeaders = () => {
  const t = useTranslations('MainPage');
  const { headers, setHeaders } = useHeaders();

  const protectedKeys = ['Accept', 'Content-Type', 'Accept-Language', 'Cache-Control'];

  const onRemoveItem = (itemToRemove: Header) => {
    if (protectedKeys.includes(itemToRemove.key)) {
      toast.error(`Cannot delete protected header: ${itemToRemove.key}`);
      return;
    }
    setHeaders(headers.filter((header) => header !== itemToRemove));
  };

  const onAddHeader = () => {
    setHeaders([...headers, { key: '', value: '', sent: false }]);
  };

  const isHeaderEmpty = (header: Header): boolean => {
    return header.key.trim() === '' || header.value.trim() === '';
  };

  const onHeaderChange = (index: number, field: 'key' | 'value', newValue: string) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index] = { ...updatedHeaders[index], [field]: newValue };
    setHeaders(updatedHeaders);
  };

  const onCheckboxChange = (index: number, checked: boolean | string) => {
    const updatedHeaders = [...headers];
    const header = updatedHeaders[index];

    if (isHeaderEmpty(header) && checked) {
      toast.error('Cannot send header with empty key or value');
      return;
    }

    updatedHeaders[index] = { ...header, sent: checked as boolean };
    setHeaders(updatedHeaders);
  };

  useEffect(() => {
    const updatedHeaders = headers.map((header) => {
      if (header.sent && isHeaderEmpty(header)) {
        return { ...header, sent: false };
      }
      return header;
    });

    if (JSON.stringify(updatedHeaders) !== JSON.stringify(headers)) {
      setHeaders(updatedHeaders);
    }
  }, [headers, setHeaders]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        {headers.map((header, index) => {
          return (
            <div className="flex gap-2  w-full" key={index}>
              <div className="flex gap-3 items-center">
                <Checkbox
                  data-testid="checkbox"
                  checked={header.sent}
                  onCheckedChange={(checked) => onCheckboxChange(index, checked)}
                />
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
        data-testid="button-add"
      >
        <CirclePlus size={18} />
        {t('add-header')}
      </button>
    </div>
  );
};

export default RestClientHeaders;
