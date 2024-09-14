import React from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

const UrlEditorGraphi = ({
  url,
  setUrl,
  sdlUrl,
  setSdlUrl,
  onSendButtonClick,
}: {
  setUrl: (url: string) => void;
  url: string;
  setSdlUrl: (sdlUrl: string) => void;
  onSendButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  sdlUrl: string;
}) => {
  const t = useTranslations('MainPage');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h6" component="div" sx={{ flexShrink: 0, width: '10rem' }}>
          {t('endpoint')}
        </Typography>
        <TextField
          sx={{ width: '100%' }}
          type="text"
          placeholder={t('endpoint-placeholder')}
          onChange={(e) => setUrl(e.target.value)}
          value={url}
        />
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h6" component="div" sx={{ flexShrink: 0, width: '10rem' }}>
          {t('sdl')}
        </Typography>
        <TextField
          sx={{ width: '100%' }}
          type="text"
          placeholder={t('sdl-placeholder')}
          onChange={(e) => setSdlUrl(e.target.value)}
          value={sdlUrl}
        />
      </Stack>

      <Button
        onClick={onSendButtonClick}
        variant="contained"
        sx={{
          display: 'flex',
          alignSelf: 'flex-end',
          marginTop: 2,
          width: 175,
          transition: 'all 0.4s ease',
          backgroundColor: 'black',
          color: 'white',
          '&:hover': {
            color: 'black',
            backgroundColor: 'white',
          },
        }}
      >
        {t('send')}
      </Button>
    </Box>
  );
};

export default UrlEditorGraphi;
