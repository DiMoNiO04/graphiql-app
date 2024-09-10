import { waitFor, render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import Footer from '../components/Footer/Footer';
import React from 'react';

test('renders Footer component with text', () => {
  render(<Footer />);

  const exampleText = `© 2024`;
  const textElement = screen.getByText(exampleText.slice(0, 5), { exact: false });
  waitFor(() => expect(textElement).toBeInTheDocument());
});
