import { IGraphiEditor } from '@/src/types/graphiEditorTypes';
import React from 'react';
import { CodeMirrorQueryEditor } from '../QueryEditor/CodeMirrorQueryEditor';

const VariablesEditor: React.FC<IGraphiEditor> = ({ value, onChange }) => {
  return <CodeMirrorQueryEditor lang="json" value={value} className="codemirror" onChange={onChange} />;
};

export default VariablesEditor;
