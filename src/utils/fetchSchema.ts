import { buildClientSchema, getIntrospectionQuery, GraphQLSchema, printSchema } from 'graphql';

export const fetchSchema = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: getIntrospectionQuery(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      const { data } = await response.json();
      if (data) {
        return printSchema(buildClientSchema(data));
      } else {
        throw new Error('Introspection query returned no data');
      }
    } else {
      const text = await response.text();
      throw new Error(`Unexpected response format: ${text}`);
    }
  } catch (error) {
    console.error('Error fetching schema:', error);
    return null;
  }
};
