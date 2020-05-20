import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Header } from '../header';
import { AuthContext } from '../../authentication/auth-context-provider';

const testAuthContext = {
    isAuthenticated: true,
    login: jest.fn(),
    getAuthenticationBody: jest.fn(),
    logout: jest.fn(),
    authenticationError: null,
  };

describe('Header', () => {
  it('should not render log out button when not authenticated', () => {
    const { queryByText } = render(<Header/>);

    expect(queryByText('Log out')).toBeNull();
  }),
  it('should render log out button when authenticated', async() => {
    const { findByTestId } = render(<AuthContext.Provider value={testAuthContext}><Header/></AuthContext.Provider>);

    expect(await findByTestId('logout-button')).toBeInTheDocument();
  });
});
