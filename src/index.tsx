import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { RootContextProvider } from './auth-context-provider';

ReactDOM.render(
  <RootContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </RootContextProvider>,
  document.getElementById('root')
);
