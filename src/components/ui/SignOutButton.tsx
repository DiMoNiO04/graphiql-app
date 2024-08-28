'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from '@mui/material';
import { SignOutHandler } from '@/src/lib/auth/handleSignOut';

const SignOutButton = () => {
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
        Sign out
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure you want to sign out?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Signing out will end your current session. You will need to sign in again to access your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSignOut} color="primary" autoFocus>
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignOutButton;
