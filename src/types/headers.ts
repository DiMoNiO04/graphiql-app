export interface Header {
  key: string;
  value: string;
  sent: boolean;
}

export interface RequestHeaderProps {
  setHeaders: (headers: Header[]) => void;
  headers: Header[];
}
