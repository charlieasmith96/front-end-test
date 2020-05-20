import React from 'react';
import renderer from 'react-test-renderer'
import { Header } from '../../components/header';
import { Login } from '../login';

const testRootContext = {
    isAuthenticated: true,
    login: jest.fn(),
    getAuthenticationBody: jest.fn(),
    logout: jest.fn(),
    authenticationError: null
  }

  const testRootContextWithError = {
      ...testRootContext,
      authenticationError: "test-error"
  }

it('should render login page correctly', () => {
    const tree = renderer.create(<Login {...testRootContext}/>)
    expect(tree).toMatchSnapshot();
})

it('should render login page correctly with error', () => {
    const tree = renderer.create(<Login {...testRootContextWithError}/>)
    expect(tree).toMatchSnapshot();
})