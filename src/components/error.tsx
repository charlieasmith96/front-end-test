import React from 'react';
import './error.css';

interface ErrorProps {
    errorMessage?: string | null
}

export const Error = (props: ErrorProps) => {
    return (
        <div className="error-message">
            {props.errorMessage}
        </div>
    )
}