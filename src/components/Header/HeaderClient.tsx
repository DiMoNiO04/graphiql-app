'use client';

import { AppBar, Box, Button, Toolbar, useScrollTrigger } from '@mui/material';
import Link from 'next/link';
import Logo from './Logo/Logo';
import LanguageButton from './Language-button/LanguageButton';
import { DecodedIdToken } from 'firebase-admin/auth';

const HeaderClient = ({ session }: { session: DecodedIdToken | null }) => {
  const trigger = useScrollTrigger({
    threshold: 0,
    disableHysteresis: true,
  });

  return (
    <AppBar
      position="sticky"
      sx={() => ({
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
          backgroundColor: trigger ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.9)',
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
          {session ? (
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
              Sign out
            </Button>
          ) : (
            <>
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
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderClient;
