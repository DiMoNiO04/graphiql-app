'use client';

import HistoryTable from '@/src/components/History/HistoryTable';
import Loader from '@/src/components/Loading/Loading';
import { Input } from '@/src/components/ui/input';
import { RequestHistoryItem } from '@/src/types/history';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

const History = () => {
  const [searchUrlTerm, setSearchUrlTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<RequestHistoryItem[]>([]);
  const t = useTranslations('MainPage');

  useEffect(() => {
    setIsLoading(true);
    const fetchRequestHistory = () => {
      const storedHistory = localStorage.getItem('graphiql-app-history-f134va');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
      setIsLoading(false);
    };

    fetchRequestHistory();
  }, []);

  return (
    <div className="flex justify-center flex-col py-16 px-10 max-w-[1200px] mx-auto text-sm font-medium gap-4">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">{t('history')}</h1>
          <p className="text-black/70">{t('history-text')}</p>
        </div>
        <Input
          type="text"
          placeholder={t('history-placeholder')}
          svg={<Search size={18} className="text-black/70" />}
          onChange={(e) => setSearchUrlTerm(e.target.value)}
          value={searchUrlTerm}
        />
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center py-64">
          <Loader size={40} />
        </div>
      ) : history.length === 0 ? (
        <div className="flex justify-center items-center py-64">
          <p className="text-black/70">{t('no-history')}</p>
        </div>
      ) : (
        <HistoryTable history={history} searchUrlTerm={searchUrlTerm} />
      )}
    </div>
  );
};

export default History;
