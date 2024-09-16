import { waitFor, render, screen, act, fireEvent } from '@testing-library/react';
import { test, expect, vi, it } from 'vitest';
import React from 'react';
import ResponseViewer from '../../components/ResponseViewer/ResponseViewer';
import ResponseEditor from '../../components/ResponseViewer/ResponseEditor';
import Loader from '../../components/Loading/Loading';
import GraphQlClient from '../../app/[locale]/graphQL-client/page';

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
  useSearchParams: () => ({
    get: () => {},
  }),
}));

vi.mock('firebase/auth');

test('renders GraphQlResponseViewer component with text', () => {
  render(<ResponseViewer status={null} responseTime={null} isLoading={false} />);

  waitFor(() => expect(screen.queryByText('Status')).not.toBeInTheDocument());
  waitFor(() => expect(screen.queryByText('Response time')).not.toBeInTheDocument());
});

test('renders GraphQlResponseEditor component with text', () => {
  render(<ResponseEditor response={''} />);

  waitFor(() => expect(screen.queryByText('Response')).not.toBeInTheDocument());
});

test('renders Loader in GraphQlResponseViewer component with text', () => {
  render(<Loader size={40} />);

  waitFor(() => expect(screen.queryByText('Loading')).not.toBeInTheDocument());
});

test('renders GraphiQlClient page with text', async () => {
  render(<GraphQlClient />);

  const elementTeam = screen.queryByText('Graph');
  expect(elementTeam).not.toBeInTheDocument();
});

it('should sent request', async () => {
  render(<GraphQlClient />);

  await act(async () => {
    fireEvent.change(screen.getByPlaceholderText('endpoint-placeholder'), {
      target: { value: 'https://countries.trevorblades.com/graphql' },
    });
    fireEvent.click(screen.getByTestId('graphql-send'));
  });

  waitFor(() => expect(screen.getByTestId('graphql-send')).not.toBeDisabled());
  waitFor(() => {
    expect(screen.getByPlaceholderText('endpoint-placeholder')).toHaveValue(
      'https://countries.trevorblades.com/graphql'
    );
  });
});
