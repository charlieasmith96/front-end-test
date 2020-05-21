import React from 'react';
import { authenticateUser, Authentication, logoutUser } from '../api/authentication-api';
import { UNEXPECTED_ERROR_STRING, INVALID_CREDENTIALS_ERROR_STRING, FAILED_LOGOUT_ERROR_STRING } from '../components/error-string-constants';

export interface AuthContextProps {
    isAuthenticated: boolean;
    login:(authentication: Authentication) => void;
    getAuthenticationBody: () => string;
    logout: () => void;
    authenticationError: string | null
}

export interface AuthState {
    isAuthenticated: boolean;
    authenticationError: string | null
}

export const 
AuthContext = React.createContext<AuthContextProps>({} as AuthContextProps);

export class AuthContextProvider extends React.Component<{}, AuthState> {
  constructor(props : AuthContextProps) {
    super(props);
    if (window.localStorage.getItem('authenticationBody')) {
      this.state = { isAuthenticated: true, authenticationError: null };
    } else {
      this.state = { isAuthenticated: false, authenticationError: null };
    }
  }

    login = (authentication: Authentication) : void => {
      authenticateUser(authentication)
        .then((response) => {
          this.setState({ isAuthenticated: true, authenticationError: null });
          window.localStorage.setItem('authenticationBody', response.session_token);
        }).catch((err) => {
          this.setState({ isAuthenticated: false });
          if (err.message === 'Not Found') {
            this.setState({ authenticationError: INVALID_CREDENTIALS_ERROR_STRING });
          } else {
            this.setState({ authenticationError: UNEXPECTED_ERROR_STRING });
          }
        });
    }

    logout = () : void => {
      logoutUser({ session_token: this.getAuthenticationBody() })
        .catch((err) => {
          this.setState({ isAuthenticated: false, authenticationError: FAILED_LOGOUT_ERROR_STRING });
        });
      this.setState({ isAuthenticated: false });
      window.localStorage.removeItem('authenticationBody');
    }

   getAuthenticationBody = () : string => {
     const authenticationBody = window.localStorage.getItem('authenticationBody');

     if (authenticationBody) {
       return authenticationBody;
     }
     this.setState({ isAuthenticated: false });
     throw new Error('No authentication token');
   }

   render() {
     const contextValues = {
       isAuthenticated: this.state.isAuthenticated,
       login: this.login,
       getAuthenticationBody: this.getAuthenticationBody,
       logout: this.logout,
       authenticationError: this.state.authenticationError,
     };

     return (
       <AuthContext.Provider value={contextValues}>
         {this.props.children}
       </AuthContext.Provider>
     );
   }
}
