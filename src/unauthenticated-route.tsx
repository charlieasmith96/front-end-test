import React, {useContext} from 'react'
import { RootContext } from './auth-context-provider'
import { Redirect, Route, RouteProps, RouteComponentProps } from 'react-router-dom'

interface UnAuthRouteProps extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export const UnAuthenticatedRoute = ({component: RouteComponent, ...restofRouteProps} : UnAuthRouteProps) => {
    const authContext = useContext(RootContext)

    return (
        <Route {...restofRouteProps}
        render={props => !authContext.isAuthenticated ? (
            <RouteComponent {...props} {...authContext} />
        ) : (<Redirect to="/dashboard" />
        )}/> 
    )
}