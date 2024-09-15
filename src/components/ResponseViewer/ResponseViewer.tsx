import { IResponseViewer } from '@/src/types/responseViewerTypes';
import { Editor } from '@monaco-editor/react';
import { Box, Stack } from '@mui/material';
import React from 'react';
import { getStatusStyle, getStatusText } from '@/src/utils/getStatusTextAndStyle';
import { useTranslations } from 'next-intl';
import Loader from '../Loading/Loading';

const ResponseViewer: React.FC<IResponseViewer> = ({ response, status, responseTime }) => {
  const t = useTranslations('MainPage');

  return (
    <Box sx={{ mt: 4 }}>
      <Stack direction="column" spacing={2} alignItems="center">
        <div className="flex gap-4 w-full justify-center">
          {status !== null ? (
            <p>
              {t('status')}
              <span className={`font-medium ${getStatusStyle(status)} px-1  rounded`}>
                {status} {getStatusText(status)}
              </span>
            </p>
          ) : (
            <p>{t('status')}</p>
          )}
          <span className="text-black/50 ">|</span>
          {responseTime !== null ? (
            <p>
              {t('time')} <span className="bg-blue-500/20 px-1 rounded-md">{responseTime.toFixed(2)} ms</span>
            </p>
          ) : (
            <p>{t('time')}</p>
          )}
        </div>
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
      </Stack>
    </Box>
  );
};

export default ResponseViewer;
