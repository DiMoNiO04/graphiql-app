'use client';

import Editor from '@monaco-editor/react';
import { Box, Typography } from '@mui/material';

const ResponseEditor = ({ response }: { response: string }) => {
  return (
    <Box sx={{ padding: '16px' }}>
      <Typography
        sx={{
          color: '#1976d2',
          fontWeight: 500,
          fontSize: '0.875rem',
          lineHeight: 1.25,
          paddingBottom: 2,
          letterSpacing: '0.02857em',
          textTransform: 'uppercase',
        }}
      >
        Response
      </Typography>
      <Editor
        className="editor-border"
        height="35vh"
        width={700}
        theme="vs"
        language="json"
        options={{
          minimap: { enabled: false },
          contextmenu: false,
          quickSuggestions: false,
          selectionHighlight: false,
          renderLineHighlight: 'none',
          hideCursorInOverviewRuler: true,
          overviewRulerLanes: 0,
          overviewRulerBorder: false,
          tabSize: 2,
          readOnly: true,
        }}
        value={response}
      />
    </Box>
  );
};

export default ResponseEditor;
