import React, { useState, SyntheticEvent, useContext } from 'react'
import { AuthContextProps, AuthContext } from './auth-context-provider'
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { Error } from '../components/error';
import './login.css'

interface LoginProps extends AuthContextProps {}

export const Login = (props: LoginProps) => {

    const [identifiant, setIdentifiant] = useState("");
    const [password, setPassword] = useState("");
  
    function validateForm() {
      return identifiant.length > 0 && password.length > 0;
    }
  
    function handleSubmit(event: SyntheticEvent) {
      event.preventDefault();
      props.login({identifiant, password})
    }

    return (
      <div className="background">
    <div className="login-container">
      <h1 className="login-title">Welcome, please log in</h1>
      <form onSubmit={handleSubmit}>
        <div className={"login"} >
        <FormGroup controlId="email">
          <h2 className="field-label"> Username</h2>
          <FormControl
            data-testid="test-username-id"
            autoFocus
            className="form-field"
            type="text"
            value={identifiant}
            onChange={e => setIdentifiant(e.target.value)}
          />
        </FormGroup>
        <FormGroup className={"login"}controlId="password">
          <h2 className="field-label">Password</h2>
          <FormControl
            data-testid="test-password-id"
            value={password}
            className="form-field"
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button className="login-button" data-testid='test-button' block disabled={!validateForm()} type="submit">
          Log in
        </Button>
      </div>
      </form>
      {props.authenticationError && <Error errorMessage={props.authenticationError}/>}

    </div>
    </div>
    )
 }