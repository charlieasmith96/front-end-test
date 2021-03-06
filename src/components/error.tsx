import React from 'react';
import './error.css';

interface ErrorProps {
    errorMessage?: string | null
    className?: string
}

export const Error = (props: ErrorProps) => (
  <div className={`error-message ${props.className}`}>
    {props.errorMessage}
  </div>
);
