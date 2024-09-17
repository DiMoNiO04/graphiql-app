export interface IHeaderProp {
  key: string;
  value: string;
}

export interface IHeadersEditor {
  headers: IHeaderProp[];
  onChange: (headers: IHeaderProp[]) => void;
}
