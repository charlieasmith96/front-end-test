import React, { useContext } from 'react';
import './header.css';
import { RootContext } from '../authentication/auth-context-provider';

export const Header = () => {

    const {logout, isAuthenticated} = useContext(RootContext)

    return (
        <div className="nav-bar">
            <h1 className="nav-bar-text">Dashboard</h1>
            {isAuthenticated && <button className="nav-bar-logout" onClick={() => logout()}>Log out</button>}
        </div>
    )

}