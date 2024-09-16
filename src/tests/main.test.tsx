import React from 'react';
import Home from '../app/[locale]/page';
import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import RootLayout from '../app/[locale]/layout';
import { NextIntlClientProvider } from 'next-intl';
import { HeaderProvider } from '../contexts/HeaderContext';
import { ParamsProvider } from '../contexts/ParamsContext';

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    get: vi.fn(),
  })),
}));

vi.mock('next-intl/server', () => ({
  ...vi.importActual('next-intl/server'),
  getMessages: vi.fn(),
  unstable_setRequestLocale: vi.fn(),
  getTranslations: vi.fn().mockImplementation(async (namespace) => {
    const words: { [namespace: string]: { [key: string]: string } } = (await import(`../messages/en.json`)).default;

    return (key: string) => words[namespace][key];
  }),
}));

vi.mock('next-intl', () => ({
  ...vi.importActual('next-intl'),
  useTranslations: () => (key: string) => key,
  NextIntlClientProvider: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
}));

vi.mock('../app/firebase/firebase-admin', () => ({
  create: vi.fn(() => ({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  })),
}));

test('renders Main page with text', async () => {
  const MainPage = (await Home()) as React.ReactElement;
  render(MainPage);

  const elementTeam = await screen.findByText(/team/i);
  expect(elementTeam).toBeInTheDocument();
  expect(screen.queryByText('History')).not.toBeInTheDocument();
  expect(screen.queryByText('GraphiQL Client')).not.toBeInTheDocument();
  expect(screen.queryByText('REST Client')).not.toBeInTheDocument();
});

test('renders RootLayout page with text', async () => {
  const MainPage = (await Home()) as React.ReactElement;
  render(
    <NextIntlClientProvider messages={undefined}>
      <HeaderProvider>
        <ParamsProvider>
          <RootLayout params={{ locale: '' }}>{MainPage}</RootLayout>
        </ParamsProvider>
      </HeaderProvider>
    </NextIntlClientProvider>
  );

  expect(screen.queryByText('History')).not.toBeInTheDocument();
});
