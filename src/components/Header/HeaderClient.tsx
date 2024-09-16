'use client';

import { AppBar, Box, Toolbar, useScrollTrigger } from '@mui/material';
import Logo from './Logo/Logo';
import LanguageButton from './Language-button/LanguageButton';
import SignOutButton from '../ui/SignOutButton';
import BaseButton from '../ui/Button';
import { useTranslations } from 'next-intl';
import React from 'react';
import { SessionResult } from '@/src/types/sessionResult';

const HeaderClient = ({ session }: { session: SessionResult }) => {
  const t = useTranslations('MainPage');

  const trigger = useScrollTrigger({
    threshold: 0,
    disableHysteresis: true,
  });

  return (
    <div className="z-10">
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
              gap: '0.5rem',
            }}
          >
            <LanguageButton />
            {session.error !== 'No token found in cookie' ? (
              <SignOutButton />
            ) : (
              <div className="flex gap-2 ml-3">
                <BaseButton data-testid="signin-button" href="/signin">
                  {t('sign-in')}
                </BaseButton>
                <BaseButton href="/signup">{t('sign-up')}</BaseButton>
              </div>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HeaderClient;
