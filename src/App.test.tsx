import React from 'react';
import { render} from '@testing-library/react';
import {UnAuthenticatedRoute} from './unauthenticated-route';
import {BrowserRouter as Router} from 'react-router-dom';
import { ProtectedRoute } from './protected-route';
import { RootContext } from './authentication/auth-context-provider';

const testRootContext = {
  isAuthenticated: true,
  login: jest.fn(),
  getAuthenticationBody: jest.fn()
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
  const { queryByText } = render(<RootContext.Provider value={testRootContext}><Router><ProtectedRoute exact path="/" component={() => (<h1 test-id="i">Login</h1>)}/></Router></RootContext.Provider>);
  expect(queryByText(/Login/i)).toBeInTheDocument();
});

test('protected route does not render child when authenticated', () => {
  const { queryByText } = render(<RootContext.Provider value={testRootContext}><Router><UnAuthenticatedRoute exact path="/" component={() => (<h1 test-id="i">Login</h1>)}/></Router></RootContext.Provider>);
  expect(queryByText(/Login/i)).toBeNull();
});