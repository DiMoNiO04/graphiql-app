'use server';

export async function postFetchData(url: string, body: string) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
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
