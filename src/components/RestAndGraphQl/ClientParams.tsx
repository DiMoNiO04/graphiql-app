import React, { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { Trash2, CirclePlus } from 'lucide-react';

import { Checkbox } from '../ui/checkbox';
import { Param } from './../../../src/types/params';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import { useParams } from './../../../src/contexts/ParamsContext';

const RestClientParams = ({ setUrl, url }: { setUrl: (url: string) => void; url: string }) => {
  const t = useTranslations('MainPage');
  const { params, setParams } = useParams();

  const onRemoveItem = (itemToRemove: Param) => {
    if (params.length > 1) {
      const newParams = params.filter((param) => param !== itemToRemove);
      setParams(newParams);
      updateUrl(newParams);
    } else {
      setParams([{ key: '', value: '' }]);
      setUrl(url.split('?')[0]);
      toast.error(t('toast-param'));
    }
  };

  const updateUrl = (newParams: Param[]) => {
    const queryString = newParams
      .filter((param) => param.key !== '')
      .map((param) => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`)
      .join('&');
    setUrl(`${url.split('?')[0]}${queryString ? `?${queryString}` : ''}`);
  };

  const onAddParam = () => {
    const newParams = [...params, { key: '', value: '' }];
    setParams(newParams);
  };

  const isParamEmpty = (param: Param): boolean => {
    return param.key.trim() === '' && param.value.trim() === '';
  };

  const onParamChange = (index: number, field: 'key' | 'value', newValue: string) => {
    const updatedParams = params.map((param, i) => (i === index ? { ...param, [field]: newValue } : param));
    setParams(updatedParams);
    updateUrl(updatedParams);
  };

  useEffect(() => {
    const parseUrl = () => {
      const [baseUrl, queryString] = url.split('?');
      if (queryString) {
        const parsedParams = queryString.split('&').map((param) => {
          const [key, value] = param.split('=').map(decodeURIComponent);
          return { key, value: value || '' };
        });
        setParams(parsedParams);
      } else {
        setParams([{ key: '', value: '' }]);
      }
    };

    parseUrl();
  }, [url, setParams]);

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 w-full pl-8 ">
          <div className="flex-1">{t('key')}</div>
          <div className="flex-1">{t('value')}</div>
        </div>
        {params.map((param, index) => (
          <div className="flex gap-2 w-full " key={index}>
            <div className="flex gap-3 items-center ">
              <Checkbox checked={!isParamEmpty(param)} />
              <div className="flex items-center w-full gap-2 ">
                <Input
                  type="text"
                  className="w-"
                  placeholder={t('key-placeholder')}
                  value={param.key}
                  onChange={(e) => onParamChange(index, 'key', e.target.value)}
                />
                <Input
                  type="text"
                  className=" w-full"
                  placeholder={t('value-placeholder')}
                  value={param.value}
                  onChange={(e) => onParamChange(index, 'value', e.target.value)}
                />
              </div>
            </div>
            <button
              className="rounded-md flex items-center hover:bg-[#18181B]/80 transition-all duration-300 ease-in-out hover:text-white p-2"
              onClick={() => onRemoveItem(param)}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
      <button
        className=" text-black border border-input px-4 py-2 rounded-md flex items-center gap-2 hover:bg-black/70 hover:text-white transition-all duration-300 w-full justify-center "
        onClick={onAddParam}
      >
        <CirclePlus size={18} />
        {t('add-params')}
      </button>
    </div>
  );
};

export default RestClientParams;
