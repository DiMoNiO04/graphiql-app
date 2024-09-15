'use client';

import React, { useState } from 'react';
import { Box, Button, Stack, Tab, Tabs, Typography } from '@mui/material';

import ControlTabPanel from '@/src/components/ControlTabPanel/ControlTabPanel';
import Documentation from '@/src/components/Documentation/Documentation';
import QueryEditor from '@/src/components/QueryEditor/QueryEditor';
import ResponseViewer from '@/src/components/ResponseViewer/ResponseViewer';
import UrlEditorGraphi from '@/src/components/UrlEditorGraphi/UrlEditorGraphi';
import VariablesEditor from '@/src/components/VariablesEditor/VariablesEditor';
import { a11yProps } from '@/src/lib/restClient/getAllyProps';
import RestClientHeaders from '@/src/components/RestClient/RestClientHeaders';
import { encodeBase64 } from '@/src/utils/base64';
import { useTranslations } from 'next-intl';
import { convertJson, getArr, isBrackets, prettierTextArea } from '@/src/utils/prettifyUtils';
import { useHeaders } from '@/src/contexts/HeaderContext';
import { Header } from '@/src/types/headers';
import { buildClientSchema, getIntrospectionQuery, GraphQLSchema } from 'graphql';
import GraphiQLRequestHeader from '@/src/components/GraphiQl/GraphiQlRequestHeader';
import GraphiQLRequestTabs from '@/src/components/GraphiQl/GraphiQlRequestTabs';
import { Send } from 'lucide-react';

import GraphiQLResponse from '@/src/components/GraphiQl/GraphiQLResponse';

const GraphiQlClientNew = () => {
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
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
  const [responseHeaders, setResponseHeaders] = useState<Record<string, string>>({});

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
      setIsLoading(false);

      // const res = await fetch(`${endpointUrl}?sdl`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     ...headersObject,
      //   },
      //   body: JSON.stringify({
      //     query: getIntrospectionQuery(),
      //   }),
      // });

      // const { data } = await res.json();
      // setSchema(buildClientSchema(data));
      // setIsOpenDocumentation(true);
      // console.log(buildClientSchema(data));
    } catch (error) {
      console.error('Error:', error);
      setResponse((error as Error).message);
      setResponseStatus(500);
      setResponseTime(null);
      setIsLoading(false);
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

  return (
    <div className="flex justify-center flex-col py-16 px-10 max-w-[700px] mx-auto text-sm font-medium h-screen max-h-[1990px]">
      <div className="flex-1 flex flex-col gap-10">
        <GraphiQLRequestHeader
          url={endpointUrl}
          setUrl={setEndpointUrl}
          sdlUrl={endpointUrl !== '' ? `${endpointUrl}?sdl` : ''}
          setSdlUrl={setSdlUrl}
          onSendButtonClick={handleSend}
        />
        <GraphiQLRequestTabs query={query} setQuery={setQuery} variables={variables} setVariables={setVariables} />
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
      </div>
    </div>
  );
};

export default GraphiQlClientNew;
