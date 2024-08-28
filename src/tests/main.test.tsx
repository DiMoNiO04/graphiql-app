import React from 'react';
import Home from '../app/page';
import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

vi.mock('next/headers', () => ({
  cookies: () => ({
    get: vi.fn().mockReturnValue({ value: 'mocked-token' }),
  }),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

test('renders component with text', async () => {
  const HomeComponent = (await Home()) as React.ReactElement;
  render(HomeComponent);

  const element = await screen.findByText(/team/i);
  expect(element).toBeInTheDocument();
});
