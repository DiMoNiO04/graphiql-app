'use client';
import HistoryTable from '@/src/components/History/HistoryTable';
import Loader from '@/src/components/Loading/Loading';
import { Input } from '@/src/components/ui/input';
import { RequestHistoryItem } from '@/src/types/history';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const History = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<RequestHistoryItem[]>([]);
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
  console.log('history', history);
  return (
    <div className="flex justify-center flex-col py-16 px-10 max-w-[1200px] mx-auto text-sm font-medium gap-4">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">History</h1>
          <p className="text-black/70">View a record of all your API requests you have made.</p>
        </div>
        <Input type="text" placeholder={'Filter history by URL'} svg={<Search size={18} className="text-black/70" />} />
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center py-64">
          <Loader size={40} />
        </div>
      ) : history.length === 0 ? (
        <div className="flex justify-center items-center py-64">
          <p className="text-black/70">No history found.</p>
        </div>
      ) : (
        <HistoryTable history={history} />
      )}
    </div>
  );
};

export default History;
