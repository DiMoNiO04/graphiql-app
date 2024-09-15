import { IResponseViewer } from '../../types/responseViewerTypes';
import { Box, Stack } from '@mui/material';
import React from 'react';
import { getStatusStyle, getStatusText } from '../../utils/getStatusTextAndStyle';
import { useTranslations } from 'next-intl';
import Loader from '../Loading/Loading';
import GraphQLResponseEditor from './ResponseEditor';

const ResponseViewer: React.FC<IResponseViewer> = ({ response, status, responseTime, isLoading }) => {
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
        {isLoading ? (
          <div className="flex justify-center items-center py-64">
            <Loader size={40} />
          </div>
        ) : response === '' ? (
          <div>{t('no-response')}</div>
        ) : (
          response && <GraphQLResponseEditor response={response} />
        )}
      </Stack>
    </Box>
  );
};

export default ResponseViewer;
