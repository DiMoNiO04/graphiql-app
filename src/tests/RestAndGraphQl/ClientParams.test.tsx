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

    expect(screen.getByPlaceholderText('Param Key')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Param Value')).toBeInTheDocument();
  });

  it('adds a new param when "Add Param" button is clicked', () => {
    const setUrl = vi.fn();
    render(
      <ParamsProvider>
        <RestClientParams setUrl={setUrl} url="https://api.example.com" />
      </ParamsProvider>
    );

    const addButton = screen.getByText('Add Param');
    fireEvent.click(addButton);

    const keyInputs = screen.getAllByPlaceholderText('Param Key');
    const valueInputs = screen.getAllByPlaceholderText('Param Value');

    expect(keyInputs).toHaveLength(2);
    expect(valueInputs).toHaveLength(2);
  });
});
