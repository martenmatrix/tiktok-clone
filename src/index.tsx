import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import inDevEnvironment from './firebase/inDevEnvironment';
import createDevEnvironment from './firebase/createDevEnvironment';
import GlobalStyle from './globalStyle';
import AvailableRoutes from './routes';

inDevEnvironment() && createDevEnvironment();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <AvailableRoutes />
    </BrowserRouter>
  </React.StrictMode>,
);
