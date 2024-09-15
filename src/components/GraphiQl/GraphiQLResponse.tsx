import React, { useState } from 'react';
import Loader from '../Loading/Loading';
import RestClientSelectResponseParameters from '../RestClient/RestClientSelectResponseParameters';
import RestClientResponseBody from '../RestClient/RestClientResponseBody';
import RestClientResponseHeaders from '../RestClient/RestClientResponseHeaders';
import RestClientResponseEditor from '../RestClient/RestClientResponseEditor';

const GraphiQL = ({
  response,
  responseStatus,
  responseTime,
  isLoading,
  responseHeaders,
}: {
  response: string;
  responseStatus: number | string | null;
  responseTime: number | null;
  isLoading: boolean;
  responseHeaders: Record<string, string>;
}) => {
  const [responseParameters, setResponseParameters] = useState<string>('Body');
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
            <div
              className={` ${
                responseParameters === 'Body' && 'max-w-[688px] w-full flex  gap-2 items-end justify-between mt-5'
              } ${responseParameters === 'Headers' && 'max-w-[688px] w-full flex flex-col gap-2 mt-5 max-h-[500px] overflow-y-auto'}`}
            >
              <RestClientSelectResponseParameters setResponseParameters={setResponseParameters} />
              {responseParameters === 'Body' && (
                <RestClientResponseBody responseStatus={responseStatus} responseTime={responseTime} />
              )}
              {responseParameters === 'Headers' && <RestClientResponseHeaders responseHeaders={responseHeaders} />}
            </div>
          </div>
          {responseParameters === 'Body' && <RestClientResponseEditor response={response} />}
        </div>
      )}
    </div>
  );
};

export default GraphiQL;
