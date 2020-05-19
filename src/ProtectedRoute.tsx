import React, { useContext, PropsWithChildren } from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { RootContext } from './RootContextProvider';


interface ProtectedRouteProps extends RouteProps {
  component: React.ReactType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export const ProtectedRoute = ({component: RouteComponent, ...resstOfRouteProps}: ProtectedRouteProps) => {
  const authContext = useContext(RootContext);
  console.log(authContext);
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