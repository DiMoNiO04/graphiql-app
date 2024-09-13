import { IGraphiEditor } from '@/src/types/graphiEditorTypes';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import prettier from 'prettier';
import parserGraphql from 'prettier/parser-graphql';

const QueryEditor: React.FC<IGraphiEditor> = ({ value, onChange }) => {
  const handlePrettify = async () => {
    try {
      const prettifiedQuery = await prettier.format(value, {
        parser: 'graphql',
        plugins: [parserGraphql],
      });
      onChange(prettifiedQuery);
    } catch (error) {
      console.error('Error prettifying query: ', error);
    }
  };

  return (
    <Stack spacing={2} direction={'row'} alignItems={'end'}>
      <TextField
        label="GraphQL Query"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        multiline
        rows={5}
        fullWidth
        margin="normal"
      />
      <Box sx={{ textAlign: 'right' }}>
        <Button
          variant="contained"
          onClick={handlePrettify}
          sx={{
            transition: 'all 0.4s ease',
            backgroundColor: '#000000',
            color: '#ffffff',
            marginLeft: 3,
            display: 'flex',
            flexShrink: 0,
            width: 175,
            alignSelf: 'flex-end',
            '&:hover': {
              color: '#000000',
              backgroundColor: '#ffffff',
            },
          }}
        >
          <Box sx={{ alignItems: 'center', display: 'flex' }}>
            <Typography marginLeft={1}>Prettify</Typography>
          </Box>
        </Button>
      </Box>
    </Stack>
  );
};

export default QueryEditor;
