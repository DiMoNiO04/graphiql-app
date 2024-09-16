import React from 'react';
import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import Header from './../../../src/components/Header/Header';

vi.mock('next-intl/navigation', () => ({
  ...vi.importActual('next-intl/navigation'),
  createSharedPathnamesNavigation: () => ({
    useRouter: () => {
      return {
        push: () => vi.fn(),
        replace: () => vi.fn(),
      };
    },
    usePathname() {
      return '';
    },
  }),
}));

vi.mock('../../app/firebase/firebase-admin', () => ({
  create: vi.fn(() => ({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  })),
}));

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    get: vi.fn(),
  })),
}));

vi.mock('next/navigation', () => ({
  ...vi.importActual('next/navigation'),
  useRouter: () => {
    return {
      push: () => vi.fn(),
    };
  },
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
}));

vi.mock('next-intl', () => ({
  ...vi.importActual('next-intl'),
  useTranslations: () => (key: string) => key,
}));

test('renders HeaderClent component with text', async () => {
  const HeaderComponent = (await Header()) as React.ReactElement;
  render(HeaderComponent);

  const textElement = screen.queryByTestId('signin-button');
  expect(textElement).not.toBeInTheDocument();
});

test('renders Header component with text', async () => {
  const HeaderComponent = (await Header()) as React.ReactElement;
  render(HeaderComponent);

  const textElement = screen.queryByTestId('signin-button');
  expect(textElement).not.toBeInTheDocument();
});
