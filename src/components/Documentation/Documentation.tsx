import { IDocumentation } from '@/src/types/documentationTypes';
import React from 'react';
import { Box, Paper, Stack, TextField } from '@mui/material';
import { CodeMirrorQueryEditor } from '../QueryEditor/CodeMirrorQueryEditor';

const Documentation: React.FC<IDocumentation> = ({ schema }) => {
  return (
    <Box sx={{ mt: 1 }}>
      <Paper sx={{ padding: 2, maxHeight: 300, overflowY: 'auto' }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <CodeMirrorQueryEditor lang="json" value={schema} className="codemirror" />
        </Stack>
      </Paper>
    </Box>
  );
};

export default Documentation;
