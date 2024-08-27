import React from 'react';
import Home from '../app/page';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

test('renders component with text', () => {
  render(<Home />);
  const element = screen.getByText(/team/i);
  expect(element).toBeInTheDocument();
});
