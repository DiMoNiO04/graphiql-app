import { selectorMethods } from '@/src/constants/constants';
import { Box, FormControl, Select, MenuItem, TextField, Button, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const UrlEditor = ({
  method,
  setMethod,
  url,
  setUrl,
  onSendButtonClick,
}: {
  method: string;
  setMethod: React.Dispatch<React.SetStateAction<string>>;
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  onSendButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}) => {
  const { control } = useForm();

  const handleChange = (event: SelectChangeEvent) => {
    setMethod(event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <FormControl sx={{ marginRight: 1, minWidth: 200 }} size="small">
        <Select labelId="select-label" defaultValue={'GET'} id="select" onChange={handleChange}>
          {selectorMethods.map(({ method }, index) => (
            <MenuItem value={method} key={index}>
              {method}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box
        component="form"
        noValidate
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Controller
          name="url"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="Enter URL"
              sx={{
                height: 40,
                '.MuiInputBase-root': {
                  height: 40,
                },
              }}
              fullWidth
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              id="url"
            />
          )}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={onSendButtonClick}
          sx={{
            maxWidth: 80,
            height: 40,
            marginLeft: 1,
            transition: 'all 0.4s ease',
            backgroundColor: 'black',
            color: 'white',
            '&:hover': {
              color: 'black',
              backgroundColor: 'white',
            },
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default UrlEditor;
