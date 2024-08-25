import Stack from '@mui/material/Stack';
import RSLogo from './RSSchool-Logo/RSLogo';
import Box from '@mui/material/Box';
import GithubLinks from './Github-links/GithubLinks';

const Footer = () => {
  return (
    <footer>
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.5rem',
          boxShadow:
            '0px 2px 4px -1px rgba(0, 0, 0, 0.3), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
        }}
      >
        <GithubLinks />
        <p>© 2024</p>
        <Box sx={{ width: 50, height: 50 }}>
          <RSLogo />
        </Box>
      </Stack>
    </footer>
  );
};

export default Footer;
