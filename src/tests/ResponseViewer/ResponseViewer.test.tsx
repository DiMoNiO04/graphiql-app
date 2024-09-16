import React from 'react';
import ResponseViewer from './../../../src/components/ResponseViewer/ResponseViewer';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('ResponseViewer', () => {
  it('renders without crashing', () => {
    render(<ResponseViewer response="" status={null} responseTime={null} isLoading={false} />);
    expect(screen.getByText('status')).toBeInTheDocument();
    expect(screen.getByText('time')).toBeInTheDocument();
    expect(screen.getByText('no-response')).toBeInTheDocument();
  });

  it('displays status and response time when provided', () => {
    render(<ResponseViewer response="Test response" status={200} responseTime={100} isLoading={false} />);
    expect(screen.getByText(/200/)).toBeInTheDocument();
    expect(screen.getByText(/100.00/)).toBeInTheDocument();
  });
});
