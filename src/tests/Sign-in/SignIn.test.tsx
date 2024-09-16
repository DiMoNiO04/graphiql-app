import { waitFor, render, screen, act, fireEvent } from '@testing-library/react';
import { test, expect, vi, it, beforeEach, describe } from 'vitest';
import React from 'react';
import SignIn from '../../app/[locale]/(auth)/signin/page';
import { signInWithEmailAndPassword } from 'firebase/auth';

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

describe('Sign In page testing', () => {
  beforeEach(() => {
    render(<SignIn />);
  });

  test('render Sign-in page with text', () => {
    const exampleText = `sign-up`;
    const textElement = screen.getByText(exampleText.slice(0, 7), { exact: false });
    waitFor(() => expect(textElement).toBeInTheDocument());
  });

  test('check if there is no error messages', () => {
    expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/password is required/i)).not.toBeInTheDocument();
  });

  it('should login user', async () => {
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'ivan@mail.ru' },
      });
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'Ivan2312!' },
      });
      fireEvent.click(screen.getByTestId('button-submit'));
    });

    waitFor(() => expect(window.location.pathname).toBe('/'));
    waitFor(() => expect(screen.getByTestId('button-submit')).not.toBeDisabled());
    waitFor(() => expect(vi.mocked(signInWithEmailAndPassword)).not.toHaveBeenCalled());
  });
});
