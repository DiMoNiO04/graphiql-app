import React from 'react';

const getStatusStyle = (status: number | string): string => {
  const numStatus = typeof status === 'string' ? parseInt(status, 10) : status;
  if (numStatus >= 200 && numStatus < 300) return 'text-green-700 bg-green-100';
  if (numStatus >= 300 && numStatus < 400) return 'text-blue-700 bg-blue-100';
  if (numStatus >= 400 && numStatus < 500) return 'text-yellow-700 bg-yellow-100';
  if (numStatus >= 500) return 'text-red-700 bg-red-100';
  return 'text-gray-700 bg-gray-100';
};

const getStatusText = (status: number | string): string => {
  const numStatus = typeof status === 'string' ? parseInt(status, 10) : status;
  if (numStatus >= 200 && numStatus < 300) return 'OK';
  if (numStatus >= 300 && numStatus < 400) return 'Redirect';
  if (numStatus >= 400 && numStatus < 500) return 'Client Error';
  if (numStatus >= 500) return 'Server Error';
  return 'Unknown';
};

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
