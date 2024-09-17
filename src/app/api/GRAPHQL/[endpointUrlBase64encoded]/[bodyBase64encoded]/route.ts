import { Header } from '../../../../../types/headers';
import { decodeBase64 } from '../../../../../utils/base64';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { endpointUrlBase64encoded: string; bodyBase64encoded: string } }
) {
  const { endpointUrlBase64encoded, bodyBase64encoded } = params;
  const url = new URL(request.url);
  const encodedHeaders = url.searchParams.get('headers') || '';

  const decodedHeaders = decodeBase64(encodedHeaders);
  const parsedHeaders = JSON.parse(decodedHeaders);
  const headersObject = parsedHeaders.reduce((acc: Record<string, string>, header: Header) => {
    if (header.sent) {
      acc[header.key] = header.value;
    }
    return acc;
  }, {});

  const endpointUrl = decodeBase64(endpointUrlBase64encoded);
  const body = JSON.parse(decodeBase64(bodyBase64encoded));

  console.log(headersObject, 'headers that will be sent');
  try {
    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: headersObject,
      body: JSON.stringify(body),
    });

    const data = await response.json();
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    return NextResponse.json({
      data,
      headers: responseHeaders,
      status: response.status,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred while processing the request' }, { status: 500 });
  }
}
