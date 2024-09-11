import React from 'react';
import RestClientSelectResponseParameters from './RestClientSelectResponseParameters';
import RestClientResponseEditor from './RestClientResponseEditor';
import Loader from '../Loading/Loading';
const RestClientResponse = ({
  response,
  responseStatus,
  responseTime,
  isLoading,
}: {
  response: string;
  responseStatus: number | string | null;
  responseTime: number | null;
  isLoading: boolean;
}) => {
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
  return (
    <div>
      <h2 className="text-xl font-semibold">Response</h2>
      {isLoading ? (
        <div className="flex justify-center items-center py-64">
          <Loader size={40} />
        </div>
      ) : response === '' ? (
        <div>No response</div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <div className="max-w-[688px] w-full flex gap-2 items-end justify-between">
              <RestClientSelectResponseParameters />
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
                {responseTime !== null && (
                  <p>
                    Response time: <span className="bg-blue-500/20 px-1 rounded-md">{responseTime.toFixed(2)} ms</span>
                  </p>
                )}
              </div>
            </div>
          </div>
          <RestClientResponseEditor response={response} />
        </div>
      )}
    </div>
  );
};

export default RestClientResponse;
