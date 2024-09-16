import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';
import GraphQL from './../../../src/components/GraphQl/GraphQLResponse';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('GraphQL Component', () => {
  it('renders loading state', () => {
    render(<GraphQL response="" responseStatus={null} responseTime={null} isLoading={true} responseHeaders={{}} />);

    expect(screen.getByText('Response')).toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders no response state', () => {
    render(<GraphQL response="" responseStatus={null} responseTime={null} isLoading={false} responseHeaders={{}} />);

    expect(screen.getByText('No response')).toBeInTheDocument();
  });

  it('renders response body', () => {
    render(
      <GraphQL
        response="Test response"
        responseStatus={200}
        responseTime={100}
        isLoading={false}
        responseHeaders={{}}
      />
    );

    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText(/200/)).toBeInTheDocument();
    expect(screen.getByText(/100.00/)).toBeInTheDocument();
  });
});
