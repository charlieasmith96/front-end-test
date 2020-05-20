import React from 'react';
import renderer from 'react-test-renderer'
import { Login } from '../login';

const testAuthContext = {
    isAuthenticated: true,
    login: jest.fn(),
    getAuthenticationBody: jest.fn(),
    logout: jest.fn(),
    authenticationError: null
  }

  const testAuthContextWithError = {
      ...testAuthContext,
      authenticationError: "test-error"
  }

it('should render login page correctly', () => {
    const tree = renderer.create(<Login {...testAuthContext}/>)
    expect(tree).toMatchSnapshot();
})

it('should render login page correctly with error', () => {
    const tree = renderer.create(<Login {...testAuthContextWithError}/>)
    expect(tree).toMatchSnapshot();
})