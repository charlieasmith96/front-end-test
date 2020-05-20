import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Login } from '../login';

const testAuthContext = {
  isAuthenticated: true,
  login: jest.fn(),
  getAuthenticationBody: jest.fn(),
  logout: jest.fn(),
  authenticationError: null,
};

const testAuthContextWithError = {
  ...testAuthContext,
  authenticationError: 'test-error',
};

describe('should render login form', () => {
  it('should render Username and Password', () => {
    const { getByText } = render(<Login {...testAuthContext} />);

    expect(getByText('Username')).toBeInTheDocument();
    expect(getByText('Password')).toBeInTheDocument();
  }),
  it('should not fire login event when login button is pressed with no data in fields', async () => {
    const { findByTestId } = render(<Login {...testAuthContext} />);

    const button = await findByTestId('test-button');

    fireEvent.click(button);

    expect(testAuthContext.login).toHaveBeenCalledTimes(0);
  }),
  it('should fire login event when login button is pressed with data in fields', async () => {
    const { findByTestId } = render(<Login {...testAuthContext} />);

    const userInput = await findByTestId('test-username-id');
    const passwordInput = await findByTestId('test-password-id');

    fireEvent.change(userInput, { target: { value: 'username' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    const button = await findByTestId('test-button');

    fireEvent.click(button);

    expect(testAuthContext.login).toHaveBeenCalledTimes(1);
  }),
  it('should display error if there is an error in state', async () => {
    const { findByText, findByTestId } = render(<Login {...testAuthContextWithError} />);

    const userInput = await findByTestId('test-username-id');
    const passwordInput = await findByTestId('test-password-id');

    fireEvent.change(userInput, { target: { value: 'username' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    const errorMessage = await findByText('test-error');

    expect(errorMessage).toBeInTheDocument();
  });
});
