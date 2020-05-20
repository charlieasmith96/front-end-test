import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Login } from './authentication/login';
import { UnAuthenticatedRoute } from './unauthenticated-route';
import { AuthContextProps } from './authentication/auth-context-provider';
import { ProtectedRoute } from './protected-route';
import { Dashboard } from './components/dashboard';

function App() {
  return (
    <Router>
      <Switch>
        <UnAuthenticatedRoute
          exact
          path="/"
          component={(authContextProps: AuthContextProps) => (
            <Login {...authContextProps} />
          )}
        />
        <ProtectedRoute
          path="/dashboard"
          component={() => (
            <Dashboard />)}
        />
      </Switch>
    </Router>
  );
}

export default App;
