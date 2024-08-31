import React from 'react';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { IUrlEditorGraphi } from '@/src/types/urlEditorGraphiTypes';

const UrlEditorGraphi: React.FC<IUrlEditorGraphi> = ({ endpointUrl, onEndpointUrlChange, sdlUrl, onSdlUrlChange }) => {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      url: endpointUrl,
      sdlUrl: sdlUrl,
    },
  });

  const onSubmit = (data: { url: string; sdlUrl: string }) => {
    onEndpointUrlChange(data.url);
    onSdlUrlChange(data.sdlUrl);
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h6" component="div" sx={{ flexShrink: 0, width: '150px' }}>
          Endpoint URL
        </Typography>
        <Controller
          name="url"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="Enter Endpoint URL"
              fullWidth
              sx={{
                height: 40,
                '.MuiInputBase-root': {
                  height: 40,
                },
              }}
              margin="normal"
              onChange={(e) => setValue('url', e.target.value)}
            />
          )}
        />
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h6" component="div" sx={{ flexShrink: 0, width: '150px' }}>
          SDL URL
        </Typography>
        <Controller
          name="sdlUrl"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="Enter SDL URL"
              fullWidth
              sx={{
                height: 40,
                '.MuiInputBase-root': {
                  height: 40,
                },
              }}
              margin="normal"
              onChange={(e) => setValue('sdlUrl', e.target.value)}
            />
          )}
        />
      </Stack>
    </Box>
  );
};

export default UrlEditorGraphi;
