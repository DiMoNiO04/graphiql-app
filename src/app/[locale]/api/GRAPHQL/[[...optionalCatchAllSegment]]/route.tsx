import { Header } from '@/src/types/headers';
import { decodeBase64 } from '@/src/utils/base64';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      encodedUrl: string;
      body: {
        query: string;
        variables: string;
      };
      encodedHeaders: string;
    };
  }
) {
  const { encodedUrl, encodedHeaders } = params;
  const decodedUrl = decodeBase64(encodedUrl);
  const decodedHeaders = decodeBase64(encodedHeaders);
  const parsedHeaders = JSON.parse(decodedHeaders);
  const headersObject = parsedHeaders.reduce((acc: Record<string, string>, header: Header) => {
    if (header.sent) {
      acc[header.key] = header.value;
    }
    return acc;
  }, {});

  try {
    const { encodedRequestBody } = await request.json();
    const decodedRequestBody = decodeBase64(encodedRequestBody);

    const response = await fetch(decodedUrl, {
      method: 'POST',
      headers: headersObject,
      body: decodedRequestBody,
    });
    const data = await response.json();

    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    console.log('Response headers at POST:', responseHeaders);
    return NextResponse.json({
      data,
      headers: responseHeaders,
      status: response.status,
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON in the response' }, { status: 500 });
    } else if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
