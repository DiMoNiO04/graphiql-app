import { waitFor, render, screen, fireEvent, act } from '@testing-library/react';
import { test, expect, vi, beforeEach, describe } from 'vitest';
import React from 'react';
import SignUp from '../app/[locale]/(auth)/signup/page';
import { createUserWithEmailAndPassword } from 'firebase/auth';

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

describe('Sign Up page testing', () => {
  beforeEach(() => {
    render(<SignUp />);
  });

  test('render Sign-up page with text', () => {
    const exampleText = `sign-in`;
    const textElement = screen.getByText(exampleText.slice(0, 7), { exact: false });
    waitFor(() => expect(textElement).toBeInTheDocument());
  });

  test('check if there is no error messages', () => {
    expect(screen.queryByText(/Email is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Password is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Username is required/i)).not.toBeInTheDocument();
  });

  test('create user', async () => {
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/username/i), {
        target: { value: 'Ivan' },
      });
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'ivan@mail.ru' },
      });
      fireEvent.change(screen.getByTestId('password-test'), {
        target: { value: 'Ivan2312!' },
      });
      fireEvent.change(screen.getByTestId('confirm-test'), {
        target: { value: 'Ivan2312!' },
      });
      fireEvent.click(screen.getByTestId('up-submit'));
    });

    waitFor(() => expect(screen.getByTestId('up-submit')).not.toBeDisabled());
    waitFor(() => expect(vi.mocked(createUserWithEmailAndPassword)).not.toHaveBeenCalled());
  });

  test('handle sign-up errors', async () => {
    vi.mocked(createUserWithEmailAndPassword).mockRejectedValueOnce(new Error('Authentication failed'));

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/username/i), {
        target: { value: 'Ivan' },
      });
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'ivan@mail.ru' },
      });
      fireEvent.change(screen.getByTestId('password-test'), {
        target: { value: 'Ivan2312!' },
      });
      fireEvent.change(screen.getByTestId('confirm-test'), {
        target: { value: 'Ivan2312!' },
      });
      fireEvent.click(screen.getByTestId('up-submit'));
    });

    expect(screen.queryByText(/Signup Failed!/i)).not.toBeInTheDocument();
  });
});
