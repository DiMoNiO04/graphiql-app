import Checkbox from '@mui/material/Checkbox';
import { Box, Stack, TextField, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const HeadersEditor = () => {
  return (
    <Stack direction="column" spacing={4} sx={{ marginTop: 1, maxWidth: 700 }}>
      <Box sx={{ alignItems: 'center', display: 'flex', columnGap: 2 }}>
        <Box sx={{ alignItems: 'center', display: 'flex' }}>
          <Checkbox />
        </Box>
        <TextField label="Header Key" variant="outlined" size="small" fullWidth />
        <TextField label="Header value" variant="outlined" size="small" fullWidth />
        <DeleteIcon color="error" />
      </Box>
      <Button
        variant="contained"
        sx={{
          transition: 'all 0.4s ease',
          backgroundColor: '#000000',
          color: '#ffffff',
          margin: '1.5rem 0',
          display: 'flex',
          width: 175,
          alignSelf: 'flex-end',
          '&:hover': {
            color: '#000000',
            backgroundColor: '#ffffff',
          },
        }}
      >
        <Box sx={{ alignItems: 'center', display: 'flex' }}>
          <AddIcon />
          <Typography marginLeft={1}>Add header</Typography>
        </Box>
      </Button>
    </Stack>
  );
};

export default HeadersEditor;
