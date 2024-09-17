import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi, describe, it } from 'vitest';
import RestClientRequestTabs from './../../../src/components/RestClient/RestClientRequestTabs';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('RestClientRequestTabs', () => {
  it('renders without crashing', () => {
    render(<RestClientRequestTabs setRequestBody={vi.fn()} requestBody="" setUrl={vi.fn()} url="" />);
    expect(screen.getByText('headers')).toBeInTheDocument();
    expect(screen.getByText('tab-body')).toBeInTheDocument();
    expect(screen.getByText('Params')).toBeInTheDocument();
  });
});
