import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './globalStyle';
import AvailableRoutes from './routes';

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
