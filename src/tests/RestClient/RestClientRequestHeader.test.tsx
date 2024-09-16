import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import RestClientRequestHeader from './../../../src/components/RestClient/RestClientRequestHeader';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('RestClientRequestHeader', () => {
  it('renders correctly and handles URL input', () => {
    const mockSetUrl = vi.fn();

    render(
      <RestClientRequestHeader
        setMethod={vi.fn()}
        setUrl={mockSetUrl}
        url=""
        onSendButtonClick={vi.fn()}
        historyData={null}
        method="GET"
      />
    );
    expect(screen.getByTestId('url')).toBeInTheDocument();
    const urlInput = screen.getByTestId('url');
    fireEvent.change(urlInput, { target: { value: 'https://api.example.com' } });
    expect(mockSetUrl).toHaveBeenCalledWith('https://api.example.com');
  });
});
