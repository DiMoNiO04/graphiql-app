'use client';

import Editor from '@monaco-editor/react';
import { useState } from 'react';

const BodyEditor = () => {
  const [value, setValue] = useState('');

  const handleChange = (value: string | undefined) => {
    setValue(value || '');
  };

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
      onChange={handleChange}
      value={value}
    />
  );
};

export default BodyEditor;
