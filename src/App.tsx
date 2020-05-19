import React, { useContext } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import  {Login}  from './authentication/login';
import { UnAuthenticatedRoute } from './unauthenticated-route';
import { AuthContextProps} from './authentication/auth-context-provider'
import { ProtectedRoute} from './protected-route'
import { Dashboard } from './components/dashboard';
import { Header } from './components/header';

function App() {
  return (
    <div>
    <Header/>
    <Router>
      <Switch>
        <UnAuthenticatedRoute exact path="/" component={() => (
          <Login/>
        )}/>
        <ProtectedRoute path="/dashboard" component={() => (
          <Dashboard/>)}/>
        <ProtectedRoute path="/my-info" component={() => (
          <h1>my info!</h1>)}/>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
