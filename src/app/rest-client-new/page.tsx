'use client';
import React, { useState } from 'react';
import RestClientRequestHeader from '@/src/components/RestClient/RestClientRequestHeader';
import RestClientRequestTabs from '@/src/components/RestClient/RestClientRequestTabs';
import RestClientResponse from '@/src/components/RestClient/RestClientResponse';
import { encodeBase64 } from '@/src/utils/base64';
import { useHeaders } from '@/src/contexts/HeaderContext';
const RestClient = () => {
  // BODY
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState('');
  const [responseStatus, setResponseStatus] = useState<number | string | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // HEADERS
  const { headers } = useHeaders();
  const [responseHeaders, setResponseHeaders] = useState([]);

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
        default:
          console.error('Unsupported HTTP method');
      }
      const data = await result?.json(); // get the data for the response content
      const endTime = performance.now();
      setResponseTime(endTime - startTime);
      setResponseHeaders(data['headers']);
      setResponseStatus(data['status']);
      setResponse(JSON.stringify(data['data'], null, 2)); // set the response content
      setIsLoading(false);
      // console.log('Response:', result);
    } catch (error) {
      console.error('Error:', error);
      setResponse((error as Error).message);
      setResponseStatus(500);
      setResponseTime(null);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center flex-col py-16 px-10 max-w-[1200px] mx-auto text-sm font-medium h-screen max-h-[1990px]">
      <div className="flex-1 flex flex-col gap-10 ">
        <RestClientRequestHeader
          setMethod={setMethod}
          setUrl={setUrl}
          url={url}
          onSendButtonClick={onSendButtonClick}
        />
        <RestClientRequestTabs setRequestBody={setRequestBody} requestBody={requestBody} />
      </div>

      <div className="flex-1 flex flex-col gap-10 border-t-2 border-input pt-3 h-screen ">
        <RestClientResponse
          response={response}
          responseStatus={responseStatus}
          responseTime={responseTime}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default RestClient;
