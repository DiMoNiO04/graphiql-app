import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { ParamsProvider } from '../../../src/contexts/ParamsContext';
import RestClientParams from './../../../src/components/RestAndGraphQl/ClientParams';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('react-hot-toast', () => ({
  default: {
    error: vi.fn(),
  },
}));

describe('RestClientParams', () => {
  it('renders initial param input fields', () => {
    const setUrl = vi.fn();
    render(
      <ParamsProvider>
        <RestClientParams setUrl={setUrl} url="https://api.example.com" />
      </ParamsProvider>
    );

    expect(screen.getByPlaceholderText('key-placeholder')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('value-placeholder')).toBeInTheDocument();
  });

  it('adds a new param when "Add Param" button is clicked', () => {
    const setUrl = vi.fn();
    render(
      <ParamsProvider>
        <RestClientParams setUrl={setUrl} url="https://api.example.com" />
      </ParamsProvider>
    );

    const addButton = screen.getByTestId('add-params');
    fireEvent.click(addButton);

    const keyInputs = screen.getAllByPlaceholderText('key-placeholder');
    const valueInputs = screen.getAllByPlaceholderText('value-placeholder');

    expect(keyInputs).toHaveLength(2);
    expect(valueInputs).toHaveLength(2);
  });
});
