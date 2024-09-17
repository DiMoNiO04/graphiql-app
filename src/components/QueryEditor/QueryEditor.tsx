import '../../styles/globals.css';
import { IGraphiEditor } from '@/src/types/graphiEditorTypes';
import { Stack } from '@mui/material';
import React from 'react';
import { CodeMirrorQueryEditor } from './CodeMirrorQueryEditor';

const QueryEditor: React.FC<IGraphiEditor> = ({ value, onChange }) => {
  return (
    <Stack spacing={2} direction={'row'} alignItems={'end'}>
      <CodeMirrorQueryEditor lang="graphql" value={value} className="codemirror" onChange={onChange} />
    </Stack>
  );
};

export default QueryEditor;
