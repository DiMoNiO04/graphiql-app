import Checkbox from '@mui/material/Checkbox';
import { Box, Stack, TextField, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const RequestHeader = () => {
  return (
    <Stack direction="column" spacing={4} sx={{ marginTop: 1, maxWidth: 700 }}>
      <Box sx={{ alignItems: 'center', display: 'flex', columnGap: 2 }}>
        <Box sx={{ alignItems: 'center', display: 'flex' }}>
          <Checkbox />
        </Box>
        <TextField label="Header Key" variant="outlined" size="small" fullWidth />
        <TextField label="Header value" variant="outlined" size="small" fullWidth />
        <DeleteIcon color="error" sx={{ '&:hover': { cursor: 'pointer', opacity: 0.6 } }} />
      </Box>
    </Stack>
  );
};

export default RequestHeader;
