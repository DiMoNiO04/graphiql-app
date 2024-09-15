import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Eye, ChevronsUpDown } from 'lucide-react';
import { RequestHistoryItem } from '../../types/history';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { getStatusStyle, getStatusText } from '../../utils/getStatusTextAndStyle';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const HistoryTable = ({ history, searchUrlTerm }: { history: RequestHistoryItem[]; searchUrlTerm: string }) => {
  const t = useTranslations('MainPage');
  const [sortedHistory, setSortedHistory] = useState(history);
  const [filteredHistory, setFilteredHistory] = useState(history);
  const [sortConfig, setSortConfig] = useState<{ key: 'url' | 'date'; direction: 'asc' | 'desc' }>({
    key: 'date',
    direction: 'desc',
  });
  const router = useRouter();
  const handleSort = (key: 'url' | 'date') => {
    let direction: 'asc' | 'desc' = 'asc';

    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    // if the current sort direction is 'desc', change it to 'asc'
    const sorted = [...sortedHistory].sort((a, b) => {
      if (key === 'url') {
        return direction === 'asc' ? a.url.localeCompare(b.url) : b.url.localeCompare(a.url);
      } else {
        return direction === 'asc'
          ? parseISO(a.date).getTime() - parseISO(b.date).getTime()
          : parseISO(b.date).getTime() - parseISO(a.date).getTime();
      }
    });

    setSortedHistory(sorted);
    setSortConfig({ key, direction });
  };

  const redirectToClient = ({ url, method, date, status, id, type }: RequestHistoryItem) => {
    const clientPath = type === 'rest-client' ? '/rest-client' : '/graphQL-client';
    console.log(id);
    router.push(`${clientPath}?id=${id}`);
  };

  useEffect(() => {
    const filtered = history.filter((item) => item.url.toLowerCase().includes(searchUrlTerm.toLowerCase()));
    setFilteredHistory(filtered);
    const sorted = [...filtered].sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime());
    setSortedHistory(sorted);
  }, [history, searchUrlTerm]);

  return (
    <Table className="w-full border-2 border-input ">
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/3 ">
            <button
              onClick={() => handleSort('url')}
              className="flex items-center transition-all duration-300 ease-in-out hover:bg-border/40 px-2 py-1 rounded-md hover:text-black "
            >
              {t('url-table')}
              <ChevronsUpDown className="ml-2 h-4 w-4" />
            </button>
          </TableHead>
          <TableHead>{t('method-table')}</TableHead>
          <TableHead>
            <button
              onClick={() => handleSort('date')}
              className="flex items-center transition-all duration-300 ease-in-out hover:bg-border/40 px-2 py-1 rounded-md hover:text-black "
            >
              {t('date-table')}
              <ChevronsUpDown className="ml-2 h-4 w-4" />
            </button>
          </TableHead>
          <TableHead>{t('status-table')}</TableHead>
          <TableHead className="w-24"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedHistory.map(({ url, method, date, status, id, type }) => (
          <TableRow key={id}>
            <TableCell className="font-medium overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]">
              {url}
            </TableCell>
            <TableCell className="text-gray-500">{method}</TableCell>
            <TableCell>{formatDistanceToNow(parseISO(date), { addSuffix: true })}</TableCell>
            <TableCell>
              {status !== undefined && status !== null && status !== '' ? (
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium  max-[815px]:px-1 max-[815px]:py-0 ${getStatusStyle(status)}`}
                >
                  {status} {getStatusText(status)}
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                  Undefined
                </span>
              )}
            </TableCell>
            <TableCell className="text-right">
              <button
                className="text-sm flex items-center gap-1 transition-all duration-300 ease-in-out hover:bg-black/10 rounded-md px-2 py-1 text-gray-500 hover:text-black"
                onClick={() => redirectToClient({ url, method, date, status, id, type })}
              >
                <Eye size={16} /> <span>View</span>
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default HistoryTable;
