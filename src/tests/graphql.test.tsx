import { test, expect, vi } from 'vitest';
import GraphiQlClient from '../app/[locale]/graphiQL-client/page';
import { render, screen } from '@testing-library/react';
import React from 'react';

vi.mock('firebase/auth');

vi.mock('next-intl', () => ({
  ...vi.importActual('next-intl'),
  useTranslations: () => (key: string) => key,
}));

test('renders GraphiQlClient page with text', async () => {
  render(<GraphiQlClient />);

  const elementTeam = await screen.findByText(/Graph/i);
  expect(elementTeam).toBeInTheDocument();
});
