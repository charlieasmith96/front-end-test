import React from 'react';
import { render } from '@testing-library/react';
import { Error } from '../error';

describe('Error', () => {
  it('should render error message', () => {
    const { getByText } = render(<Error errorMessage="test-error" />);

    expect(getByText('test-error')).toBeInTheDocument();
  });
});
