import { RequestHistoryItem } from '@/src/types/history';

export const getLocalStorageDataById = (id: string) => {
  const storedHistory = localStorage.getItem('graphiql-app-history-f134va');
  if (storedHistory) {
    const history: RequestHistoryItem[] = JSON.parse(storedHistory);
    const request = history.find((item) => item.id === id);
    if (request) {
      return request;
    }
  }
  return null;
};
