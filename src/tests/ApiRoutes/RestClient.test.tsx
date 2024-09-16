import { describe, it, expect, vi } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { GET, POST, DELETE, PUT, PATCH } from '../../../src/app/api/[method]/[encodedUrl]/[encodedHeaders]/route';

vi.mock('node-fetch', () => ({
  default: vi.fn(),
}));

type HandlerFunction = (
  request: NextRequest,
  { params }: { params: { method: string; encodedUrl: string; encodedHeaders: string } }
) => Promise<NextResponse>;

type Handlers = {
  [key in 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH']: HandlerFunction;
};

describe('API Route Handlers', () => {
  const mockParams = {
    method: 'METHOD',
    encodedUrl: btoa('https://api.example.com'),
    encodedHeaders: btoa(JSON.stringify([{ key: 'Content-Type', value: 'application/json', sent: true }])),
  };

  const mockRequest = (method: string, body?: object) => {
    return new NextRequest(`http://localhost:3000/api/${method}/encodedUrl/encodedHeaders`, {
      method,
      body: body ? JSON.stringify(body) : undefined,
    });
  };

  const testMethod = async (method: string, handler: Function, body?: object) => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue({ message: `${method} Success` }),
      headers: new Map([['content-type', 'application/json']]),
      status: 200,
    });

    const request = mockRequest(method, body);
    const response = await handler(request, { params: { ...mockParams, method } });

    expect(response).toBeInstanceOf(NextResponse);
    const responseData = await response.json();
    expect(responseData).toEqual({
      data: { message: `${method} Success` },
      headers: { 'content-type': 'application/json' },
      status: 200,
    });
  };

  const testErrorHandling = async (method: string, handler: Function, errorType: string) => {
    let mockError;
    switch (errorType) {
      case 'SyntaxError':
        mockError = new SyntaxError('Invalid JSON');
        break;
      case 'Error':
        mockError = new Error('Generic error');
        break;
      default:
        mockError = 'Unknown error';
    }

    global.fetch = vi.fn().mockRejectedValue(mockError);

    const request = mockRequest(method);
    const response = await handler(request, { params: { ...mockParams, method } });

    expect(response).toBeInstanceOf(NextResponse);
    const responseData = await response.json();

    expect(response.status).toBe(500);
  };

  describe('GET', () => {
    it('should handle successful GET request', () => testMethod('GET', GET));
  });

  describe('POST', () => {
    it('should handle successful POST request', () =>
      testMethod('POST', POST, { encodedRequestBody: btoa('{"key":"value"}') }));
  });

  describe('DELETE', () => {
    it('should handle successful DELETE request', () => testMethod('DELETE', DELETE));
  });

  describe('PUT', () => {
    it('should handle successful PUT request', () =>
      testMethod('PUT', PUT, { encodedRequestBody: btoa('{"key":"updated value"}') }));
  });

  describe('PATCH', () => {
    it('should handle successful PATCH request', () =>
      testMethod('PATCH', PATCH, { encodedRequestBody: btoa('{"key":"patched value"}') }));
  });

  describe('Error Handling', () => {
    const methods = ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'];
    const errorTypes = ['SyntaxError', 'Error', 'Unknown'];
    const handlers = { GET, POST, DELETE, PUT, PATCH };

    methods.forEach((method) => {
      errorTypes.forEach((errorType) => {
        it(`should handle ${errorType} in ${method} request`, () =>
          testErrorHandling(method, handlers[method as keyof Handlers], errorType));
      });
    });
  });
});
