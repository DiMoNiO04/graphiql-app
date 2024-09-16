import React from 'react';
import RestClientRequestEditor from './../../../src/components/RestClient/RestClientRequestEditor';
import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
vi.mock('@monaco-editor/react', () => ({
  default: ({ onChange }: { onChange: (value: string) => void }) => (
    <textarea data-testid="mock-editor" onChange={(e) => onChange(e.target.value)} />
  ),
}));

test('RestClientRequestEditor renders correctly', () => {
  const mockSetRequestBody = vi.fn();
  render(<RestClientRequestEditor setRequestBody={mockSetRequestBody} requestBody="" />);

  const editorElement = screen.getByTestId('mock-editor');
  expect(editorElement).toBeInTheDocument();
});
