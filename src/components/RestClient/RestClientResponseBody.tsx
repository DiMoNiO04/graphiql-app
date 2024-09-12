import { getStatusStyle, getStatusText } from '@/src/utils/getStatusTextAndStyle';
import React from 'react';

const RestClientResponseBody = ({
  responseStatus,
  responseTime,
}: {
  responseStatus: number | string | null;
  responseTime: number | null;
}) => {
  return (
    <div className="flex gap-4 ">
      {responseStatus !== null && (
        <p>
          Status:{` `}
          <span className={`font-medium ${getStatusStyle(responseStatus)} px-1  rounded`}>
            {responseStatus} {getStatusText(responseStatus)}
          </span>
        </p>
      )}
      <span className="text-black/50 ">|</span>
      {responseTime !== null ? (
        <p>
          Response time: <span className="bg-blue-500/20 px-1 rounded-md">{responseTime.toFixed(2)} ms</span>
        </p>
      ) : (
        <p>
          Response time: <span className="bg-blue-500/20 px-1 rounded-md">undefined</span>
        </p>
      )}
    </div>
  );
};

export default RestClientResponseBody;
