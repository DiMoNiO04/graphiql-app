import Link from 'next/link';
import Button from '@mui/material/Button';
import React from 'react';

const BaseButton = ({ children, href }: { children: React.ReactNode; href?: string }) => {
  return (
    <Button
      variant="contained"
      component={Link}
      href={href}
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
      {children}
    </Button>
  );
};

export default BaseButton;
