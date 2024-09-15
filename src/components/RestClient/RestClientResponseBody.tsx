import { getStatusStyle, getStatusText } from '../../utils/getStatusTextAndStyle';
import React from 'react';
import { useTranslations } from 'next-intl';

const RestClientResponseBody = ({
  responseStatus,
  responseTime,
}: {
  responseStatus: number | string | null;
  responseTime: number | null;
}) => {
  const t = useTranslations('MainPage');

  return (
    <div className="flex gap-4 ">
      {responseStatus !== null && (
        <p>
          {t('status')}
          {` `}
          <span className={`font-medium ${getStatusStyle(responseStatus)} px-1  rounded`}>
            {responseStatus} {getStatusText(responseStatus)}
          </span>
        </p>
      )}
      <span className="text-black/50 ">|</span>
      {responseTime !== null ? (
        <p>
          {t('time')} <span className="bg-blue-500/20 px-1 rounded-md">{responseTime.toFixed(2)} ms</span>
        </p>
      ) : (
        <p>
          {t('time')} <span className="bg-blue-500/20 px-1 rounded-md">undefined</span>
        </p>
      )}
    </div>
  );
};

export default RestClientResponseBody;
