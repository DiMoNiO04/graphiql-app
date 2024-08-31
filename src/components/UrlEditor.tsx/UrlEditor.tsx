import { selectorMethods } from '@/src/constants/constants';
import { Box, FormControl, Select, MenuItem, TextField, Button, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const UrlEditor = () => {
  const { control } = useForm();

  const [method, setMethod] = useState('');

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
              id="url"
            />
          )}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
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
