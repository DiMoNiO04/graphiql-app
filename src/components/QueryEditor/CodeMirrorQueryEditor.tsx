import { CodeMirrorQuery } from '@/src/types/codeMirrorQueryTypes';
import { langs } from '@uiw/codemirror-extensions-langs';
import CodeMirror from '@uiw/react-codemirror';

export function CodeMirrorQueryEditor({ lang, ...rest }: CodeMirrorQuery) {
  const editorLanguage = lang === 'json' ? langs.json() : langs.lezer();

  return <CodeMirror extensions={[editorLanguage]} {...rest} />;
}
