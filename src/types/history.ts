import { Header } from './headers';

export interface RequestHistoryItem {
  id: string;
  url: string;
  method: string;
  date: string;
  status: number | string;
  body?: string;
  headers?: Header[];
  sdlUrl?: string;
  type: 'rest-client' | 'graphql';
}
