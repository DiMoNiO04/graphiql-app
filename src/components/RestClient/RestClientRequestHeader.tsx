import React from 'react';
import RestClientSelectMethod from './RestClientSelectMethod';
import { Input } from '@/src/components/ui/input';
import { Send } from 'lucide-react';
import { RequestHistoryItem } from '@/src/types/history';
import { useTranslations } from 'next-intl';

const RestClientRequestHeader = ({
  setMethod,
  setUrl,
  url,
  onSendButtonClick,
  historyData,
  method,
}: {
  setMethod: (method: string) => void;
  setUrl: (url: string) => void;
  url: string;
  onSendButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  historyData: RequestHistoryItem | null;
  method: string;
}) => {
  const t = useTranslations('MainPage');

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">{historyData ? `Api: ${historyData.id}` : t('rest-title')}</h1>
      <div className="flex gap-3">
        <RestClientSelectMethod setMethod={setMethod} method={method} />
        <Input type="text" placeholder={t('api-placeholder')} onChange={(e) => setUrl(e.target.value)} value={url} />
        <button
          className={`bg-[#18181B] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#18181B]/80 transition-all duration-300 ${
            url === '' ? 'opacity-80 cursor-not-allowed hover:bg-[#18181B]' : ''
          }`}
          disabled={url === ''}
          onClick={onSendButtonClick}
        >
          <Send size={16} />
          {t('send')}
        </button>
      </div>
    </div>
  );
};

export default RestClientRequestHeader;
