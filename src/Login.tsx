import React, { useContext, useState, SyntheticEvent } from 'react'
import { RootContext, AuthContextProps } from './RootContextProvider'
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { Redirect, Route } from 'react-router-dom';

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
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email">
          <h2>Username</h2>
          <FormControl
            data-testid="test-username-id"
            autoFocus
            type="text"
            value={identifiant}
            onChange={e => setIdentifiant(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <h2>Password</h2>
          <FormControl
            data-testid="test-password-id"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button data-testid='test-button' block disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
    )
 }