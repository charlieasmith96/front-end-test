import React from 'react';
import { render} from '@testing-library/react';
import {UnAuthenticatedRoute} from './unauthenticated-route';
import {BrowserRouter as Router} from 'react-router-dom';
import { ProtectedRoute } from './protected-route';
import { AuthContext } from './authentication/auth-context-provider';

const testAuthContext = {
  isAuthenticated: true,
  login: jest.fn(),
  getAuthenticationBody: jest.fn(),
  logout: jest.fn(),
  authenticationError: null
}

test('unauthorised route does render children when unauthenticated', () => {
  const { getByText } = render(<Router><UnAuthenticatedRoute exact path="/" component={() => (<h1>Login</h1>)}/></Router>);
  expect(getByText(/Login/i)).toBeInTheDocument();
});

test('protected route does not render child when unauthenticated', () => {
  const { queryByText } = render(<Router><ProtectedRoute exact path="/" component={() => (<h1 test-id="i">Login</h1>)}/></Router>);
  expect(queryByText(/Login/i)).toBeNull();
});

test('protected route does not render child when authenticated', () => {
  const { queryByText } = render(<AuthContext.Provider value={testAuthContext}><Router><ProtectedRoute exact path="/" component={() => (<h1 test-id="i">Login</h1>)}/></Router></AuthContext.Provider>);
  expect(queryByText(/Login/i)).toBeInTheDocument();
});

test('protected route does not render child when authenticated', () => {
  const { queryByText } = render(<AuthContext.Provider value={testAuthContext}><Router><UnAuthenticatedRoute exact path="/" component={() => (<h1 test-id="i">Login</h1>)}/></Router></AuthContext.Provider>);
  expect(queryByText(/Login/i)).toBeNull();
});