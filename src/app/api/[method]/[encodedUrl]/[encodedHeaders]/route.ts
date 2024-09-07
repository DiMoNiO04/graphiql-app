import { NextRequest, NextResponse } from 'next/server';
import { decodeBase64 } from '../../../../../utils/base64';
import { Header } from '@/src/types/headers';

export async function GET(
  request: NextRequest,
  { params }: { params: { method: string; encodedUrl: string; encodedHeaders: string } }
) {
  const { encodedUrl, encodedHeaders } = params;
  const decodedUrl = decodeBase64(encodedUrl);

  // headers
  const decodedHeaders = decodeBase64(encodedHeaders);
  const parsedHeaders = JSON.parse(decodedHeaders);
  const headersObject = parsedHeaders.reduce((acc: Record<string, string>, header: Header) => {
    acc[header.key] = header.value;
    return acc;
  }, {});

  try {
    const response = await fetch(decodedUrl, { method: 'GET', headers: headersObject });
    const data = await response.json();

    // get the headers from the response
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    return NextResponse.json({
      data,
      headers: responseHeaders,
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

export async function POST(
  request: NextRequest,
  { params }: { params: { method: string; encodedUrl: string; encodedHeaders: string } }
) {
  const { encodedUrl, encodedHeaders } = params;
  const decodedUrl = decodeBase64(encodedUrl);

  // headers
  const decodedHeaders = decodeBase64(encodedHeaders);
  const parsedHeaders = JSON.parse(decodedHeaders);
  const headersObject = parsedHeaders.reduce((acc: Record<string, string>, header: Header) => {
    acc[header.key] = header.value;
    return acc;
  }, {});

  console.log('headersObject', headersObject);
  try {
    const { encodedRequestBody } = await request.json();
    const decodedRequestBody = decodeBase64(encodedRequestBody);

    const response = await fetch(decodedUrl, {
      method: 'POST',
      headers: headersObject,
      body: decodedRequestBody,
    });
    const data = await response.json();
    return NextResponse.json(data);
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
