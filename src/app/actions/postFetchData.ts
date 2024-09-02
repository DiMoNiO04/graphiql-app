'use server';

import { decodeBase64 } from '@/src/utils/base64';

export async function postFetchData(url: string, body: string) {
  const decodedUrl = decodeBase64(url);
  const decodedBody = decodeBase64(body);
  console.log('URL:', url);
  console.log('Decoded URL:', decodedUrl);
  console.log('Body:', body);
  console.log('Decoded Body:', decodedBody);
  try {
    const response = await fetch(decodedUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: decodedBody,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // this formatting makes the output more readable for us
    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Error posting data:', error);
    return `Error: ${(error as Error).message}`;
  }
}
