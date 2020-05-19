import React, { useState, PropsWithChildren, useEffect } from 'react';
import { authenticateUser, Authentication } from './AuthenticationApi';
import { NavItem } from 'react-bootstrap';

export interface AuthContextProps {
    isAuthenticated: boolean;
    login:(authentication: Authentication) => void;
    getAuthenticationBody: () => string;
}

export const RootContext = React.createContext<AuthContextProps>({} as AuthContextProps);

export class RootContextProvider extends React.Component {

    state = {
        isAuthenticated: false
    }

    // I DO NOT LIKE USING THIS DEPRECATED LIFECYCLE METHOD BUT I COULDN'T FIND AN ALTERNATIVE IN TIME
    componentWillMount() {
        if (window.localStorage.getItem('authenticationBody')) {
            console.log("I go through the first path")
            this.setState({isAuthenticated:true})
        }

    }
    
    login = async(authentication: Authentication) => {
        let response;
        try {
            response = await authenticateUser(authentication);
        } catch(response) {

        }

        if (response) {
            this.setState({isAuthenticated: true})
            window.localStorage.setItem('authenticationBody', response.session_token);
        }
  }

   getAuthenticationBody = () : string => {
        var authenticationBody = window.localStorage.getItem('authenticationBody');

        if (authenticationBody) {
            return authenticationBody
        } else {
            this.setState({isAuthenticated: false})
            throw new Error('No authentication token')
        }
    }

    render() {

  const contextValues = {
      isAuthenticated: this.state.isAuthenticated,
      login: this.login,
      getAuthenticationBody: this.getAuthenticationBody
  };

  return (
      <RootContext.Provider value={contextValues}>
          {this.props.children}
      </RootContext.Provider>
  )
}
}