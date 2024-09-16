import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';
import Loader from '../components/Loading/Loading';

describe('Loader Component', () => {
  test('renders with correct size', () => {
    const size = 40;
    render(<Loader size={size} />);

    const loaderElement = screen.getByTestId('loader');
    expect(loaderElement).toBeInTheDocument();
  });
});
