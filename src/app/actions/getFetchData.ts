'use server';

export async function getFetchData(url: string) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Error fetching data:', error);
    return `Error: ${(error as Error).message}`;
  }
}
