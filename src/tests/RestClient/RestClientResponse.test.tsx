import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';
import RestClientResponse from './../../../src/components/RestClient/RestClientResponse';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('RestClientResponse Component', () => {
  it('renders loading state', () => {
    render(
      <RestClientResponse response="" responseStatus={null} responseTime={null} isLoading={true} responseHeaders={{}} />
    );

    expect(screen.getByText('response')).toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders no response state', () => {
    render(
      <RestClientResponse
        response=""
        responseStatus={null}
        responseTime={null}
        isLoading={false}
        responseHeaders={{}}
      />
    );

    expect(screen.getByText('no-response')).toBeInTheDocument();
  });

  it('renders response body', () => {
    render(
      <RestClientResponse
        response="Test response"
        responseStatus={200}
        responseTime={100}
        isLoading={false}
        responseHeaders={{ 'Content-Type': 'application/json' }}
      />
    );

    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText(/200/)).toBeInTheDocument();
    expect(screen.getByText(/100.00/)).toBeInTheDocument();
  });
});
