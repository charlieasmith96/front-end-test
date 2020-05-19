import React from 'react';
import { authenticateUser, Authentication, logoutUser } from '../api/authentication-api';

export interface AuthContextProps {
    isAuthenticated: boolean;
    login:(authentication: Authentication) => void;
    getAuthenticationBody: () => string;
    logout: () => void;
    authenticationError: string | null
}

export const RootContext = React.createContext<AuthContextProps>({} as AuthContextProps);

export class RootContextProvider extends React.Component {

    state = {
        isAuthenticated: false,
        authenticationError: null
    }

    // I DO NOT LIKE USING THIS DEPRECATED LIFECYCLE METHOD BUT I COULDN'T FIND AN ALTERNATIVE IN TIME
    componentWillMount() {
        if (window.localStorage.getItem('authenticationBody')) {
            this.setState({isAuthenticated:true})
        }

    }
    
    login = async(authentication: Authentication) => {
        let response;
            response = authenticateUser(authentication)
            .then((response) => {
                this.setState({isAuthenticated: true})
                window.localStorage.setItem('authenticationBody', response.session_token);
            }).catch((err) => {
                console.log(err)
                this.setState({isAuthenticated:false})
                if (err.message === 'Not Found') {
                    this.setState({authenticationError: "Please enter a correct username and password"})
                } else {
                    this.setState({authenticationError: "Something went wrong"})
                }
            })
  }

    logout = () => {
        logoutUser({session_token: this.getAuthenticationBody()})
        this.setState({isAuthenticated: false})
        window.localStorage.removeItem('authenticationBody');
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
      getAuthenticationBody: this.getAuthenticationBody,
      logout: this.logout,
      authenticationError: this.state.authenticationError
  };

  return (
      <RootContext.Provider value={contextValues}>
          {this.props.children}
      </RootContext.Provider>
  )
}
}