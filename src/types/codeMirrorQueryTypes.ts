export interface CodeMirrorQuery {
  onChange?: (value: string) => void;
  value: string;
  lang: string;
  className?: string;
  readOnly?: boolean;
}
