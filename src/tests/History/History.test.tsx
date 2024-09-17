import { test, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import History from '../../app/[locale]/history/page';
import HistoryTable from '../../components/History/HistoryTable';

vi.mock('firebase/auth');

vi.mock('next-intl', () => ({
  ...vi.importActual('next-intl'),
  useTranslations: () => (key: string) => key,
}));

vi.mock('next/navigation', () => ({
  ...vi.importActual('next/navigation'),
  useRouter: () => {
    return {
      push: () => vi.fn(),
    };
  },
}));

test('renders History page with text', () => {
  render(<History />);

  waitFor(() => expect(screen.queryByText('History')).not.toBeInTheDocument());
});

test('renders HistoryTable component with text', () => {
  render(<HistoryTable history={[]} searchUrlTerm={''} />);

  waitFor(() => expect(screen.queryByText('Date')).toBeInTheDocument());
  waitFor(() => expect(screen.queryByText('URL')).toBeInTheDocument());
  waitFor(() => expect(screen.queryByText('Method')).toBeInTheDocument());
  waitFor(() => expect(screen.queryByText('Status')).toBeInTheDocument());
});
