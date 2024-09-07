import React from 'react';

import Editor from '@monaco-editor/react';

import RestClientSelectEditorMethod from './RestClientSelectEditorMethod';

// TODO ADD  theme="vs-dark" WHEN DARK
const RestClientResponseEditor = ({ response }: { response: string }) => {
  return (
    <div className="flex flex-col items-start gap-3 w-full">
      <Editor
        className="border-input border "
        height="35vh"
        width={700}
        language="json"
        theme="vs"
        // loading={<div>Loading...</div>}
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
        // onChange={(value) => setRequestBody(value || '')}
        value={response}
      />
    </div>
  );
};

export default RestClientResponseEditor;
