import { Box, TextareaAutosize, Typography } from '@mui/material';

const Response = () => {
  return (
    <Box sx={{ padding: '16px' }}>
      <Typography
        sx={{
          color: '#1976d2',
          fontWeight: 500,
          fontSize: '0.875rem',
          lineHeight: 1.25,
          paddingBottom: 2,
          letterSpacing: '0.02857em',
          textTransform: 'uppercase',
        }}
      >
        Response
      </Typography>
      <TextareaAutosize
        style={{
          width: 700,
          height: 300,
        }}
      />
    </Box>
  );
};

export default Response;
