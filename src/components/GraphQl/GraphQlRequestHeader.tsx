import React from 'react';
import { Input } from '../ui/input';
import { RequestHistoryItem } from '@/src/types/history';
import { useTranslations } from 'next-intl';

const GraphQLRequestHeader = ({
  url,
  setUrl,
  sdlUrl,
  setSdlUrl,
  historyData,
}: {
  setUrl: (url: string) => void;
  url: string;
  setSdlUrl: (sdlUrl: string) => void;
  sdlUrl: string;
  historyData: RequestHistoryItem | null;
}) => {
  const handleEndpointUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndpointUrl = e.target.value;
    setUrl(newEndpointUrl);
    setSdlUrl(`${newEndpointUrl}?sdl`);
  };
  const t = useTranslations('MainPage');

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">{historyData ? `GraphQL Client: ${historyData.id}` : t('graphQL-client')}</h1>
      <div className="flex gap-5 flex-col">
        <div className="flex flex-col gap-2">
          <p className="text-black/90 text-base">{t('endpoint-placeholder')}</p>
          <Input
            type="text"
            placeholder={t('endpoint-placeholder')}
            className="w-full"
            value={url}
            onChange={handleEndpointUrlChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-black/90 text-base">{t('sdl-placeholder')}</p>
          <Input
            type="text"
            placeholder={t('sdl-placeholder')}
            className="w-full"
            value={sdlUrl}
            onChange={(e) => setSdlUrl(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default GraphQLRequestHeader;
