'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from '@mui/material';
import { SignOutHandler } from '@/src/lib/auth/handleSignOut';
import { useTranslations } from 'next-intl';

const SignOutButton = () => {
  const t = useTranslations('MainPage');
  const [open, setOpen] = useState(false);

  const handleClickOpen = (event: React.MouseEvent) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { handleSignOut } = SignOutHandler({ setOpen });

  return (
    <>
      <Button
        variant="contained"
        component={Link}
        onClick={handleClickOpen}
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
        {t('auth.sign-out')}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t('auth.dialog-title')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{t('auth.dialog-text')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t('auth.cancel')}
          </Button>
          <Button onClick={handleSignOut} color="primary" autoFocus>
            {t('auth.sign-out')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignOutButton;
