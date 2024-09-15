import { waitFor, render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import React from 'react';
import Documentation from '../components/Documentation/Documentation';

test('renders Documentation component with text', () => {
  render(<Documentation schema={''} />);

  waitFor(() => expect(screen.queryByText('Documentation')).not.toBeInTheDocument());
});
