'use client';

import React, { createContext, useState, useContext } from 'react';
import { RequestParamProps } from '../types/params';

const ParamsContext = createContext<RequestParamProps>({
  params: [],
  setParams: () => {},
});

export function ParamsProvider({ children }: { children: React.ReactNode }) {
  const [params, setParams] = useState([{ key: '', value: '' }]);

  return <ParamsContext.Provider value={{ params, setParams }}>{children}</ParamsContext.Provider>;
}

export function useParams() {
  const context = useContext(ParamsContext);
  if (!context) {
    throw new Error('useParams must be used within a ParamsProvider');
  }
  return context;
}
