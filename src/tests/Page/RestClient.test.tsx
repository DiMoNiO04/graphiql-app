import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import RestClient from './../../../src/app/[locale]/rest-client/page';
import { encodeBase64 } from './../../../src/utils/base64';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: () => null,
  }),
}));

vi.mock('../../../contexts/HeaderContext', () => ({
  useHeaders: () => ({
    headers: [],
    setHeaders: vi.fn(),
  }),
}));

vi.mock('../../../utils/base64', () => ({
  encodeBase64: vi.fn((str) => str),
}));

describe('RestClient', () => {
  it('handles GET request correctly', async () => {
    const mockUrl = 'https://api.example.com';
    const mockResponse = { status: 200, data: { message: 'Success' }, headers: {} };

    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(mockResponse),
    });

    render(<RestClient />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: mockUrl } });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringMatching(/^\/api\/GET\/aHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20=\//)
      );
    });

    await waitFor(() => {
      expect(screen.getByText(/200/)).toBeInTheDocument();
    });
  });

  //   it('handles POST request correctly', async () => {
  //     const mockUrl = 'https://api.example.com';
  //     const fakePOSTData = {
  //       key1: 'value1',
  //       key2: 'value2',
  //     };
  //     const mockResponse = { status: 201, data: { message: 'Created' }, headers: {} };

  //     global.fetch = vi.fn().mockResolvedValue({
  //       json: () => Promise.resolve(mockResponse),
  //     });

  //     vi.mock('../utils/base64', () => ({
  //       encodeBase64: vi.fn((str) => btoa(str)),
  //     }));

  //     render(<RestClient />);

  //     // Set method to POST
  //     fireEvent.change(screen.getByTestId('method'), { target: { value: 'POST' } });

  //     // Set URL
  //     fireEvent.change(screen.getByTestId('url'), { target: { value: mockUrl } });

  //     // Set request body to fakePOSTData
  //     fireEvent.change(screen.getByTestId('requestBody'), { target: { value: JSON.stringify(fakePOSTData) } });

  //     fireEvent.click(screen.getByRole('button', { name: /Send/i }));

  //     await waitFor(() => {
  //       expect(global.fetch).toHaveBeenCalledWith(
  //         expect.stringContaining('/api/POST/'),
  //         expect.objectContaining({
  //           method: 'POST',
  //           body: expect.stringContaining('encodedRequestBody'),
  //         })
  //       );
  //     });

  //     expect(await screen.findByText(/201/)).toBeInTheDocument();
  //   });

  it('renders the component and handles send button click', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ status: 200, data: { message: 'Success' }, headers: {} }),
    });

    render(<RestClient />);

    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'https://api.example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    await screen.findByText(/status/i);
    expect(screen.getByText(/status/i)).toBeInTheDocument();
  });
});
