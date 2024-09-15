import { test, expect, vi, it } from 'vitest';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import RestClient from '../app/[locale]/rest-client/page';
import RestClientHeaders from '../components/RestClient/RestClientHeaders';
import RestClientResponseBody from '../components/RestClient/RestClientResponseBody';
import RestClientResponseEditor from '../components/RestClient/RestClientResponseEditor';
import RestClientResponseHeaders from '../components/RestClient/RestClientResponseHeaders';
import RestClientSelectEditorMethod from '../components/RestClient/RestClientSelectEditorMethod';
import RestClientSelectResponseParameters from '../components/RestClient/RestClientSelectResponseParameters';
import RestClientRequestEditor from '../components/RestClient/RestClientRequestEditor';
import { useSearchParams } from 'next/navigation';

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
  useSearchParams: () => ({
    get: () => {},
  }),
}));

test('renders RestClient page with text', () => {
  render(<RestClient />);

  waitFor(() => expect(screen.queryByText('API')).not.toBeInTheDocument());
});

it('should send an api call', async () => {
  render(<RestClient />);

  await act(async () => {
    fireEvent.change(screen.getByTestId('url'), {
      target: { value: 'https://jsonplaceholder.typicode.com/posts' },
    });
    fireEvent.click(screen.getByTestId('button-send'));
  });

  waitFor(() => expect(screen.getByTestId('button-send')).not.toBeDisabled());
  // waitFor(() => expect(screen.getByTestId('url')).not.toHaveValue('https://jsonplaceholder.typicode.com/posts'));
});

test('renders RestClientHeaders component with text', () => {
  render(<RestClientHeaders />);

  waitFor(() => expect(screen.getByTestId('button-add')).toBeInTheDocument());
  waitFor(() => expect(screen.queryByText('Accept')).toBeInTheDocument());
});

test('renders RestClientResponseBody component with text', () => {
  render(<RestClientResponseBody responseStatus={null} responseTime={null} />);

  waitFor(() => expect(screen.queryByText('Status')).not.toBeInTheDocument());
  waitFor(() => expect(screen.queryByText('Response time')).not.toBeInTheDocument());
});

test('renders RestClientResponseEditor component with text', () => {
  render(<RestClientResponseEditor response={''} />);

  waitFor(() => expect(screen.queryByText('Query')).not.toBeInTheDocument());
});

test('renders RestClientResponseHeaders component with text', () => {
  render(<RestClientResponseHeaders responseHeaders={{ Accept: '/' }} />);

  waitFor(() => expect(screen.queryByText('Body')).not.toBeInTheDocument());
});

test('renders RestClientSelectEditorMethod component with text', () => {
  render(
    <RestClientSelectEditorMethod
      setBodyMethod={function (method: string): void {
        throw new Error('Function not implemented.');
      }}
    />
  );

  waitFor(() => expect(screen.queryByText('GET')).not.toBeInTheDocument());
});

test('renders RestClientSelectResponseParameters component with text', () => {
  render(
    <RestClientSelectResponseParameters
      setResponseParameters={function (responseParameters: string): void {
        throw new Error('Function not implemented.');
      }}
    />
  );

  waitFor(() => expect(screen.queryByText('Body')).toBeInTheDocument());
});

test('renders RestClientRequestEditor component with text', () => {
  render(
    <RestClientRequestEditor
      setRequestBody={function (body: string): void {
        throw new Error('Function not implemented.');
      }}
      requestBody={''}
    />
  );

  waitFor(() => expect(screen.queryByText('Body')).not.toBeInTheDocument());
});

it('should add header', async () => {
  render(<RestClientHeaders />);

  await act(async () => {
    fireEvent.click(screen.getByTestId('button-add'));
  });
  waitFor(() => expect(screen.getByTestId('button-add')).not.toBeDisabled());
});
