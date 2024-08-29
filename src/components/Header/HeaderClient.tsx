'use client';

import { AppBar, Box, Toolbar, useScrollTrigger } from '@mui/material';
import Logo from './Logo/Logo';
import LanguageButton from './Language-button/LanguageButton';
import { DecodedIdToken } from 'firebase-admin/auth';
import SignOutButton from '../ui/SignOutButton';
import BaseButton from '../ui/Button';

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
            <SignOutButton />
          ) : (
            <>
              <BaseButton href="/signin">Sign In</BaseButton>
              <BaseButton href="/signup">Sign up</BaseButton>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderClient;
