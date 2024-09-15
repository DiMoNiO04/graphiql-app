import { test, expect, vi, it } from 'vitest';

import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import GraphQlClient from '../app/[locale]/graphQL-client/page';

vi.mock('firebase/auth');

vi.mock('next-intl', () => ({
  ...vi.importActual('next-intl'),
  useTranslations: () => (key: string) => key,
}));

test('renders GraphiQlClient page with text', async () => {
  render(<GraphQlClient />);

  const elementTeam = await screen.findByText(/Graph/i);

  await act(async () => {
    fireEvent.click(screen.getByTestId('button-prettier'));
  });

  waitFor(() => expect(screen.getByTestId('button-prettier')).not.toBeDisabled());
  expect(elementTeam).toBeInTheDocument();
});

it('should sent request', async () => {
  render(<GraphQlClient />);

  await act(async () => {
    fireEvent.change(screen.getByTestId('graphql-endpoint'), {
      target: { value: 'https://countries.trevorblades.com/graphql' },
    });
    fireEvent.click(screen.getByTestId('graphql-send'));
  });

  waitFor(() => expect(screen.getByTestId('graphql-send')).not.toBeDisabled());
  waitFor(() =>
    expect(screen.getByTestId('graphql-endpoint')).toHaveValue('https://countries.trevorblades.com/graphql')
  );
});
