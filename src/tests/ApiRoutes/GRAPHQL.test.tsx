import { describe, it, expect, vi, beforeEach, MockInstance } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { POST } from './../../../src/app/api/GRAPHQL/[endpointUrlBase64encoded]/[bodyBase64encoded]/route';

vi.mock('next/server', () => ({
  NextRequest: vi.fn(),
  NextResponse: {
    json: vi.fn().mockReturnValue({
      data: { message: 'Success' },
      headers: { 'content-type': 'application/json' },
      status: 200,
    }),
  },
}));
vi.mock('./../../../src/utils/base64', () => ({
  decodeBase64: vi.fn((str) => Buffer.from(str, 'base64').toString('utf-8')),
}));

describe('POST API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should handle a successful POST request', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue({ message: 'Success' }),
      headers: new Map([['content-type', 'application/json']]),
      status: 200,
    });

    global.fetch = mockFetch;

    const mockUrl = new URL('http://localhost:3000/api/GRAPHQL/encodedEndpoint/encodedBody');
    mockUrl.searchParams.set(
      'headers',
      btoa(JSON.stringify([{ key: 'Content-Type', value: 'application/json', sent: true }]))
    );

    const mockRequest = {
      url: mockUrl.toString(),
      method: 'POST',
    } as unknown as NextRequest;

    const mockParams = {
      endpointUrlBase64encoded: btoa('https://api.example.com'),
      bodyBase64encoded: btoa(JSON.stringify({ query: 'query { test }' })),
    };

    const response = await POST(mockRequest, { params: mockParams });

    expect(response).toBeDefined();
    expect(NextResponse.json).toHaveBeenCalled();
  });

  it('should handle errors and return a 500 status', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Fetch failed'));
    console.error = vi.fn();
    const mockUrl = new URL('http://localhost:3000/api/GRAPHQL/encodedEndpoint/encodedBody');
    mockUrl.searchParams.set(
      'headers',
      btoa(JSON.stringify([{ key: 'Content-Type', value: 'application/json', sent: true }]))
    );

    const mockRequest = {
      url: mockUrl.toString(),
      method: 'POST',
    } as unknown as NextRequest;

    const mockParams = {
      endpointUrlBase64encoded: btoa('https://api.example.com'),
      bodyBase64encoded: btoa(JSON.stringify({ query: 'query { test }' })),
    };

    vi.mocked(NextResponse.json).mockReturnValueOnce({
      error: 'An error occurred while processing the request',
      status: 500,
    } as any);

    const response = await POST(mockRequest, { params: mockParams });

    expect(response).toBeDefined();
    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: 'An error occurred while processing the request' },
      { status: 500 }
    );

    expect(console.error).toHaveBeenCalledWith('Error:', expect.any(Error));
  });
});
