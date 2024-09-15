import { Header } from '../types/headers';

const generateUniqueId = () => {
  const min = 100000;
  const max = 999999;
  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  const strNum = randomNum.toString();
  return `${strNum.slice(0, 3)}-${strNum.slice(3)}`;
};

export const saveRequestToLocalStorage = (
  url: string,
  method: string,
  status: number | string | null,
  headers: Header[],
  requestBody: string,
  sdlUrl?: string,
  requestType?: 'rest-client' | 'graphql'
) => {
  const requestHistory = JSON.parse(localStorage.getItem('graphiql-app-history-f134va') || '[]');
  const newRequest = {
    id: generateUniqueId(),
    url,
    method,
    date: new Date().toISOString(),
    status,
    body: requestBody,
    headers,
    type: requestType,
    sdlUrl,
  };
  requestHistory.push(newRequest);
  localStorage.setItem('graphiql-app-history-f134va', JSON.stringify(requestHistory));
};
