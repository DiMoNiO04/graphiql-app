import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HeaderProvider } from '../../contexts/HeaderContext';
import RestClientHeaders from './../../../src/components/RestClient/RestClientHeaders';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('RestClientHeaders', () => {
  it('renders add header button', () => {
    render(
      <HeaderProvider>
        <RestClientHeaders />
      </HeaderProvider>
    );

    const addButton = screen.getByTestId('button-add');
    expect(addButton).toBeInTheDocument();
  });

  it('adds a new header when add button is clicked', () => {
    render(
      <HeaderProvider>
        <RestClientHeaders />
      </HeaderProvider>
    );

    const addButton = screen.getByTestId('button-add');
    fireEvent.click(addButton);

    const headerInputs = screen.getAllByPlaceholderText(/Header/);
    expect(headerInputs.length).toBe(10);
  });
});
