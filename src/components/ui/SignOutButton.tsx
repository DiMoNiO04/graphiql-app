'use client';
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from '@mui/material';
import { SignOutHandler } from '../../lib/auth/handleSignOut';
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
        {t('sign-out')}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t('dialog-title')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{t('dialog-text')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t('cancel')}
          </Button>
          <Button onClick={handleSignOut} color="primary" autoFocus>
            {t('sign-out')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignOutButton;
