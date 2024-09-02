'use client';

import Editor from '@monaco-editor/react';

const BodyEditor = ({
  setRequestBody,
  requestBody,
}: {
  setRequestBody: React.Dispatch<React.SetStateAction<string>>;
  requestBody: string;
}) => {
  return (
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
        readOnly: false,
      }}
      onChange={(value) => setRequestBody(value || '')}
      value={requestBody}
    />
  );
};

export default BodyEditor;
