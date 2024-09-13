'use client';

import React, { createContext, useState, useContext } from 'react';
import { RequestHeaderProps } from '../types/headers';

const HeaderContext = createContext<RequestHeaderProps>({
  headers: [],
  setHeaders: () => {},
});

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [headers, setHeaders] = useState([
    { key: 'Accept', value: '*/*', sent: true },
    { key: 'Content-Type', value: 'application/json', sent: true },
    { key: 'Accept-Language', value: 'en-US,en;q=0.9', sent: true },
    { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate', sent: true },
  ]);

  return <HeaderContext.Provider value={{ headers, setHeaders }}>{children}</HeaderContext.Provider>;
}

export function useHeaders() {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeaders must be used within a HeaderProvider');
  }
  return context;
}
