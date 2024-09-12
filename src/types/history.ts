export interface RequestHistoryItem {
  id: string;
  url: string;
  method: string;
  date: string;
  status: number | string;
  type: 'rest-client' | 'graphql';
}
