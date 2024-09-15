'use client';

import React, { useEffect, useState } from 'react';
import RestClientRequestHeader from '../../../components/RestClient/RestClientRequestHeader';
import RestClientRequestTabs from '../../../components/RestClient/RestClientRequestTabs';
import RestClientResponse from '../../../components/RestClient/RestClientResponse';
import { encodeBase64 } from '../../../utils/base64';
import { useHeaders } from '../../../contexts/HeaderContext';
import { saveRequestToLocalStorage } from '../../../utils/saveRequestToLocalStorage';
import { useSearchParams } from 'next/navigation';
import { getLocalStorageDataById } from '../../../utils/getLocalStorageDataById';
import { RequestHistoryItem } from '../../../types/history';

const RestClient = () => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState('');
  const [responseStatus, setResponseStatus] = useState<number | string | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const [historyData, setHistoryData] = useState<RequestHistoryItem | null>(null);
  const { headers, setHeaders } = useHeaders();
  const [responseHeaders, setResponseHeaders] = useState<Record<string, string>>({});

  const onSendButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const startTime = performance.now();
    setIsLoading(true);
    console.log(method, 'method');
    try {
      let result;
      const encodedUrl = encodeBase64(url);
      const encodedHeaders = encodeBase64(JSON.stringify(headers));
      switch (method) {
        case 'GET':
          result = await fetch(`/api/${method}/${encodedUrl}/${encodedHeaders}`);
          break;
        case 'POST':
          const encodedRequestBody = encodeBase64(requestBody);
          result = await fetch(`/api/${method}/${encodedUrl}/${encodedHeaders}`, {
            method: 'POST',
            body: JSON.stringify({ encodedRequestBody }),
          });
        case 'DELETE':
          result = await fetch(`/api/${method}/${encodedUrl}/${encodedHeaders}`, {
            method: 'DELETE',
          });
          break;
        case 'PUT':
          const encodedPutBody = encodeBase64(requestBody);
          result = await fetch(`/api/${method}/${encodedUrl}/${encodedHeaders}`, {
            method: 'PUT',
            body: JSON.stringify({ encodedRequestBody: encodedPutBody }),
          });
          break;
        case 'PATCH':
          const encodedPatchBody = encodeBase64(requestBody);
          result = await fetch(`/api/${method}/${encodedUrl}/${encodedHeaders}`, {
            method: 'PATCH',
            body: JSON.stringify({ encodedRequestBody: encodedPatchBody }),
          });
          break;
        default:
          console.error('Unsupported HTTP method');
      }
      const data = await result?.json();
      const endTime = performance.now();
      setResponseTime(endTime - startTime);
      setResponseHeaders(data['headers']);
      setResponseStatus(data['status']);
      setResponse(JSON.stringify(data['data'], null, 2));
      saveRequestToLocalStorage(url, method, data['status'], headers, requestBody, 'rest-client');
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setResponse((error as Error).message);
      setResponseStatus(500);
      setResponseTime(null);
      setIsLoading(false);
      saveRequestToLocalStorage(url, method, 500, headers, requestBody, 'rest-client');
    }
  };

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      const data = getLocalStorageDataById(id);

      setHistoryData(data);
      setUrl(data?.url ?? '');
      setMethod(data?.method ?? 'GET');
      setHeaders(data?.headers ?? []);
      setRequestBody(data?.body ?? '');
    }
  }, [searchParams, setHeaders]);

  return (
    <div className="flex justify-center flex-col py-16 px-10 max-w-[1200px] mx-auto text-sm font-medium h-screen max-h-[1990px]">
      <div className="flex-1 flex flex-col gap-10 ">
        <RestClientRequestHeader
          setMethod={setMethod}
          setUrl={setUrl}
          method={method}
          url={url}
          onSendButtonClick={onSendButtonClick}
          historyData={historyData}
        />
        <RestClientRequestTabs setRequestBody={setRequestBody} requestBody={requestBody} />
      </div>

      <div className="flex-1 flex flex-col gap-10 border-t-2 border-input pt-3 pb-24 h-screen ">
        <RestClientResponse
          response={response}
          responseStatus={responseStatus}
          responseTime={responseTime}
          isLoading={isLoading}
          responseHeaders={responseHeaders}
        />
      </div>
    </div>
  );
};

export default RestClient;
