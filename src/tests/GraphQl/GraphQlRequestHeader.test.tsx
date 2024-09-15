import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';

import { RequestHistoryItem } from '@/src/types/history';
import GraphQLRequestHeader from './../../../src/components/GraphQl/GraphQlRequestHeader';

describe('GraphQLRequestHeader', () => {
  const mockSetUrl = vi.fn() as (url: string) => void;
  const mockSetSdlUrl = vi.fn() as (sdlUrl: string) => void;

  const defaultProps = {
    url: 'https://api.example.com/graphql',
    setUrl: mockSetUrl,
    sdlUrl: 'https://api.example.com/graphql?sdl',
    setSdlUrl: mockSetSdlUrl,
    historyData: null as RequestHistoryItem | null,
  };

  const mockHistoryData: RequestHistoryItem = {
    id: '123',
    url: 'https://api.example.com/graphql',
    method: 'POST',
    date: new Date().toISOString(),
    status: 200,
    type: 'graphql',
    sdlUrl: 'https://api.example.com/graphql?sdl',
  };

  it('renders without crashing', () => {
    render(<GraphQLRequestHeader {...defaultProps} />);
    expect(screen.getByText('GraphQL Client')).toBeInTheDocument();
  });

  it('displays correct title when historyData is provided', () => {
    const props = {
      ...defaultProps,
      historyData: mockHistoryData,
    };
    render(<GraphQLRequestHeader {...props} />);
    expect(screen.getByText('GraphQL Client: 123')).toBeInTheDocument();
  });

  it('updates URL and SDL URL when endpoint URL changes', () => {
    render(<GraphQLRequestHeader {...defaultProps} />);
    const input = screen.getByPlaceholderText('Enter Api endpoint URL');
    fireEvent.change(input, { target: { value: 'https://new-api.example.com/graphql' } });

    expect(mockSetUrl).toHaveBeenCalledWith('https://new-api.example.com/graphql');
    expect(mockSetSdlUrl).toHaveBeenCalledWith('https://new-api.example.com/graphql?sdl');
  });

  it('updates SDL URL independently', () => {
    render(<GraphQLRequestHeader {...defaultProps} />);
    const input = screen.getByPlaceholderText('Enter SDL endpoint URL');
    fireEvent.change(input, { target: { value: 'https://new-sdl.example.com/graphql?sdl' } });

    expect(mockSetSdlUrl).toHaveBeenCalledWith('https://new-sdl.example.com/graphql?sdl');
  });
});
