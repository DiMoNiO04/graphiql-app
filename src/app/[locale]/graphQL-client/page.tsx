'use client';

import React, { useEffect, useState } from 'react';

import Documentation from '@/src/components/Documentation/Documentation';
import { a11yProps } from '@/src/lib/restClient/getAllyProps';
import { encodeBase64 } from '@/src/utils/base64';
import { useTranslations } from 'next-intl';
import { convertJson, getArr, isBrackets, prettierTextArea } from '@/src/utils/prettifyUtils';
import { useHeaders } from '@/src/contexts/HeaderContext';
import GraphiQLRequestHeader from '@/src/components/GraphiQl/GraphiQlRequestHeader';
import GraphiQLRequestTabs from '@/src/components/GraphiQl/GraphiQlRequestTabs';
import { Send } from 'lucide-react';
import GraphiQLResponse from '@/src/components/GraphiQl/GraphiQLResponse';
import { fetchSchema } from '@/src/utils/fetchSchema';
import Loader from '@/src/components/Loading/Loading';
import { saveRequestToLocalStorage } from '@/src/utils/saveRequestToLocalStorage';
import { useSearchParams } from 'next/navigation';
import { getLocalStorageDataById } from '@/src/utils/getLocalStorageDataById';
import { RequestHistoryItem } from '@/src/types/history';

const GraphQlClient = () => {
  const t = useTranslations('MainPage');
  // SENT TO GRAPHQL
  const { headers, setHeaders } = useHeaders();
  const [endpointUrl, setEndpointUrl] = useState('');
  const [sdlUrl, setSdlUrl] = useState('');
  const [response, setResponse] = useState('');
  const [variables, setVariables] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [responseStatus, setResponseStatus] = useState<number | string | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);

  const [isOpenDocumentation, setIsOpenDocumentation] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [schema, setSchema] = useState('');
  const [historyData, setHistoryData] = useState<RequestHistoryItem | null>(null);
  const [responseHeaders, setResponseHeaders] = useState<Record<string, string>>({});

  const searchParams = useSearchParams();

  const handleSend = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const startTime = performance.now();
    setIsLoading(true);

    try {
      const encodedUrl = encodeBase64(endpointUrl);
      const encodedHeaders = encodeBase64(JSON.stringify(headers));
      const encodedBody = encodeBase64(
        JSON.stringify({
          query: query,
          variables: variables ? JSON.parse(variables) : undefined,
        })
      );

      const result = await fetch(`/api/GRAPHQL/${encodedUrl}/${encodedBody}?headers=${encodedHeaders}`, {
        method: 'POST',
      });

      const response = await result?.json();
      console.log(response, 'response');

      const endTime = performance.now();
      setResponseTime(endTime - startTime);
      setResponseHeaders(response['headers']);
      console.log('Just set headers:', response['headers']);
      console.log(responseHeaders);
      setResponseStatus(response['status']);
      setResponse(JSON.stringify(response['data'], null, 2));

      saveRequestToLocalStorage(
        endpointUrl,
        'POST',
        response['status'],
        headers,
        JSON.stringify({
          query: query,
          variables: variables ? JSON.parse(variables) : undefined,
        }),
        'graphql'
      );
      setIsLoading(false);

      //  SCHEMA

      const schemaText = await fetchSchema(endpointUrl);
      if (schemaText) {
        setSchema(schemaText);
        setIsOpenDocumentation(true);
      } else {
        setIsOpenDocumentation(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setResponse((error as Error).message);
      setResponseStatus(500);
      setResponseTime(null);
      setIsLoading(false);
      setIsOpenDocumentation(false);
    }
  };

  const prettierText = () => {
    if (query) {
      const arr = getArr(query);
      if (isBrackets(arr)) {
        setQuery(prettierTextArea(arr));
      }
    }
    if (variables) {
      setVariables(convertJson(variables));
    }
  };

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      const data = getLocalStorageDataById(id);

      setHistoryData(data);
      setEndpointUrl(data?.url ?? '');
      setHeaders(data?.headers ?? []);
      setQuery(data?.body ?? '');
    }
  }, [searchParams, setHeaders]);

  return (
    <div className="flex justify-center flex-col py-16 px-10 max-w-[700px] mx-auto text-sm font-medium ">
      <div className="flex-1 flex flex-col gap-10">
        <GraphiQLRequestHeader
          url={endpointUrl}
          setUrl={setEndpointUrl}
          sdlUrl={endpointUrl !== '' ? `${endpointUrl}?sdl` : ''}
          setSdlUrl={setSdlUrl}
          onSendButtonClick={handleSend}
        />
        <GraphiQLRequestTabs
          query={query}
          setQuery={setQuery}
          variables={variables}
          setVariables={setVariables}
          prettierText={prettierText}
          setUrl={setEndpointUrl}
          url={endpointUrl}
        />
        <button
          className={`bg-[#18181B] text-white px-4 py-2 rounded-md flex items-center gap-3 hover:bg-[#18181B]/80 transition-all duration-300 w-full text-center justify-center ${
            endpointUrl === '' ? 'opacity-80 cursor-not-allowed hover:bg-[#18181B]' : ''
          }`}
          disabled={endpointUrl === ''}
          onClick={handleSend}
        >
          <Send size={16} />
          Send
        </button>
        <GraphiQLResponse
          response={response}
          isLoading={isLoading}
          responseTime={responseTime}
          responseStatus={responseStatus}
          responseHeaders={responseHeaders}
        />
        {isOpenDocumentation && (
          <div>
            <h2 className="text-xl font-semibold"> {t('documentation')}</h2>
            {isLoading ? (
              <div className="flex justify-center items-center py-64">
                <Loader size={40} />
              </div>
            ) : (
              <div>
                <Documentation schema={schema} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GraphQlClient;
