export interface Param {
  key: string;
  value: string;
}

export interface RequestParamProps {
  params: Param[];
  setParams: React.Dispatch<React.SetStateAction<Param[]>>;
}
