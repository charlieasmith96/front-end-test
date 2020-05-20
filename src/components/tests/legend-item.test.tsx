import React from 'react';
import { render } from '@testing-library/react';
import { LegendItem } from '../legend-item';

describe('Header', () => {
  it('logout button should fire logout event', () => {
    const { getByText } = render(<LegendItem colour="blue" label="test-label" />);
    expect(getByText('test-label')).toBeInTheDocument();
  });
});
