import React from 'react';
import Editor from '@monaco-editor/react';

const RestClientResponseEditor = ({ response }: { response: string }) => {
  return (
    <div className="flex flex-col items-start gap-3 w-full">
      <Editor
        className="border-input border "
        height="35vh"
        width={700}
        language="json"
        theme="vs"
        loading={''}
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
    </div>
  );
};

export default RestClientResponseEditor;
