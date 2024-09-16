import { waitFor, render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import React from 'react';
import ResponseViewer from '../../components/ResponseViewer/ResponseViewer';
import ResponseEditor from '../../components/ResponseViewer/ResponseEditor';
import Loader from '../../components/Loading/Loading';

vi.mock('next-intl', () => ({
  ...vi.importActual('next-intl'),
  useTranslations: () => (key: string) => key,
}));

test('renders GraphQlResponseViewer component with text', () => {
  render(<ResponseViewer status={null} responseTime={null} isLoading={false} />);

  waitFor(() => expect(screen.queryByText('Status')).toBeInTheDocument());
  waitFor(() => expect(screen.queryByText('Response time')).toBeInTheDocument());
});

test('renders GraphQlResponseEditor component with text', () => {
  render(<ResponseEditor response={''} />);

  waitFor(() => expect(screen.queryByText('Response')).not.toBeInTheDocument());
});

test('renders Loader in GraphQlResponseViewer component with text', () => {
  render(<Loader size={40} />);

  waitFor(() => expect(screen.queryByText('Loading')).not.toBeInTheDocument());
});
