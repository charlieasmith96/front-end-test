import React, { useContext } from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { AuthContext } from './authentication/auth-context-provider';


interface ProtectedRouteProps extends RouteProps {
  component: React.ReactType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export const ProtectedRoute = ({component: RouteComponent, ...resstOfRouteProps}: ProtectedRouteProps) => {
  const authContext = useContext(AuthContext);
  return (
    <Route
      {...resstOfRouteProps}
      render={props => authContext.isAuthenticated ? (
        <RouteComponent {...props} {...authContext} />
      ) : (<Redirect to={'/'}/>
  )}
  />
  );
}