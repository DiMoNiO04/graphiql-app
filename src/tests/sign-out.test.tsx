import React from 'react';
import { waitFor, render, screen, act, fireEvent } from '@testing-library/react';
import { expect, it, test, vi } from 'vitest';
import SignOutButton from '../components/ui/SignOutButton';
import { signOut } from 'firebase/auth';

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

test('renders SignOutButton component with text', () => {
  render(<SignOutButton />);

  const exampleText = `sign-out`;
  const textElement = screen.getByText(exampleText.slice(0, 7), { exact: false });
  waitFor(() => expect(textElement).toBeInTheDocument());
});

it('logout user'),
  async () => {
    render(<SignOutButton />);

    const exampleText = `sign-out`;
    const logoutButton = screen.getByText(exampleText.slice(0, 7), { exact: false });

    await act(async () => {
      fireEvent.click(logoutButton);
    });

    waitFor(() => expect(window.location.pathname).toContain('/'));
    waitFor(() => expect(vi.mocked(signOut)).toHaveBeenCalled());
  };
