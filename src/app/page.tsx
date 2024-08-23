'use client';

import Button from '@mui/material/Button';
import React from 'react';

export default function Home() {
  return (
    <main>
      <Button variant="outlined" onClick={() => console.log('1')}>
        Contained
      </Button>
      Start project
    </main>
  );
}
