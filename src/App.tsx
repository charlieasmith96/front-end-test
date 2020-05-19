import React, { useContext } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import  {Login}  from './Login';
import { UnAuthenticatedRoute } from './UnauthenticatedRoute';
import { AuthContextProps} from './RootContextProvider'
import { ProtectedRoute} from './ProtectedRoute'

function App() {
  return (
    <Router>
      <Switch>
        <UnAuthenticatedRoute exact path="/" component={(authProps: AuthContextProps) => (
          <Login {...authProps}/>
        )}/>
        <ProtectedRoute path="/dashboard" component={() => (
          <h1>Hey!</h1>)}/>
        <ProtectedRoute path="/my-info" component={() => (
          <h1>my info!</h1>)}/>
      </Switch>
    </Router>
  );
}

export default App;
