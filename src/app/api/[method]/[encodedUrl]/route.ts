import { NextRequest, NextResponse } from 'next/server';
import { decodeBase64 } from '../../../../utils/base64';

export async function GET(request: NextRequest, { params }: { params: { method: string; encodedUrl: string } }) {
  const { encodedUrl } = params;
  const decodedUrl = decodeBase64(encodedUrl);
  try {
    const response = await fetch(decodedUrl, { method: 'GET' });
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

export async function POST(request: NextRequest, { params }: { params: { method: string; encodedUrl: string } }) {
  const { encodedUrl } = params;
  const decodedUrl = decodeBase64(encodedUrl);
  try {
    const { encodedRequestBody } = await request.json();
    const decodedRequestBody = decodeBase64(encodedRequestBody);
    console.log(decodedRequestBody);
    const response = await fetch(decodedUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
