export interface Header {
  key: string;
  value: string;
}

export interface RequestHeaderProps {
  setHeaders: (headers: Header[]) => void;
  headers: Header[];
}
