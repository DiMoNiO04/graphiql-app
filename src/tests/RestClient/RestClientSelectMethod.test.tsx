import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RestClientSelectMethod from './../../../src/components/RestClient/RestClientSelectMethod';

vi.mock('../../components/ui/select', () => ({
  Select: ({ children, onValueChange }: { children: React.ReactNode; onValueChange: (value: string) => void }) => (
    <div data-testid="mock-select">
      {children}
      <button onClick={() => onValueChange('POST')}>Select POST</button>
    </div>
  ),
  SelectTrigger: ({ children }: { children: React.ReactNode }) => <div data-testid="select-trigger">{children}</div>,
  SelectValue: () => <span data-testid="select-value">GET</span>,
  SelectContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectGroup: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectItem: ({ children, value }: { children: React.ReactNode; value: string }) => (
    <div data-value={value}>{children}</div>
  ),
}));

describe('RestClientSelectMethod', () => {
  it('renders with default GET method and allows method selection', () => {
    const mockSetMethod = vi.fn();
    render(<RestClientSelectMethod setMethod={mockSetMethod} method="" />);
    expect(screen.getByTestId('select-value')).toHaveTextContent('GET');
    const selectPostButton = screen.getByText('Select POST');
    fireEvent.click(selectPostButton);
    expect(mockSetMethod).toHaveBeenCalledWith('POST');
  });
});
