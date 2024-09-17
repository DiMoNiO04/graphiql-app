export interface IResponseViewer {
  response?: string;
  status: number | string | null;
  responseTime: number | null;
  isLoading: boolean;
}
