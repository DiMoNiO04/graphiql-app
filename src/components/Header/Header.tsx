'use client';

import { AppBar, Box, Button, Toolbar, useScrollTrigger } from '@mui/material';
import Link from 'next/link';
import Logo from './Logo/Logo';
import LanguageButton from './Language-button/LanguageButton';

const Header = () => {
  const trigger = useScrollTrigger({
    threshold: 0,
    disableHysteresis: true,
  });

  return (
    <AppBar
      position="sticky"
      sx={() => ({
        backgroundColor: '#ffffff',
        '.MuiToolbar-root': {
          paddingBlock: 1,
          boxSizing: 'border-box',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          zIndex: -1,
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.5,
          backgroundColor: trigger ? '#bdbdbd' : '#ffffff',
          transition: 'all 0.2s ease',
        },
      })}
    >
      <Toolbar
        sx={() => ({
          justifyContent: 'space-between',
        })}
      >
        <Logo />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <LanguageButton />
          <Button
            variant="contained"
            component={Link}
            href="/signin"
            sx={{
              transition: 'all 0.4s ease',
              backgroundColor: '#000000',
              color: '#ffffff',
              '&:hover': {
                color: '#000000',
                backgroundColor: '#ffffff',
              },
            }}
          >
            Sign in
          </Button>
          <Button
            variant="contained"
            component={Link}
            href="/signup"
            sx={{
              transition: 'all 0.4s ease',
              backgroundColor: '#000000',
              color: '#ffffff',
              margin: '0 5px',
              '&:hover': {
                color: '#000000',
                backgroundColor: '#ffffff',
              },
            }}
          >
            Sign up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
