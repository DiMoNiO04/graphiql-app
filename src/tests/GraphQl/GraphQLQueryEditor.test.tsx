import { waitFor, render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import React from 'react';
import QueryEditor from '../../components/QueryEditor/QueryEditor';

test('renders GraphQlQueryEditor component with text', () => {
  render(<QueryEditor value={''} />);

  waitFor(() => expect(screen.queryByText('Query')).not.toBeInTheDocument());
});
