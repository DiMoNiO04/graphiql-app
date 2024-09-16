import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import RestClientResponseHeaders from './../../../src/components/RestClient/RestClientResponseHeaders';
import { describe } from 'node:test';

describe('RestClientResponseHeaders', () => {
  it('renders "No response headers" when responseHeaders is empty', () => {
    render(<RestClientResponseHeaders responseHeaders={{}} />);
    expect(screen.getByText('No response headers')).toBeInTheDocument();
  });

  it('renders table with headers when responseHeaders are provided', () => {
    const mockHeaders = {
      'Content-Type': 'application/json',
      'X-Custom-Header': 'Custom Value',
    };

    render(<RestClientResponseHeaders responseHeaders={mockHeaders} />);

    expect(screen.getByText('Content-Type')).toBeInTheDocument();
    expect(screen.getByText('application/json')).toBeInTheDocument();
    expect(screen.getByText('X-Custom-Header')).toBeInTheDocument();
    expect(screen.getByText('Custom Value')).toBeInTheDocument();
  });
});
