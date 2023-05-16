import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { app } from './firebase/firebaseApp.js';
import GlobalStyle from './globalStyle';
import AvailableRoutes from './routes';

// This logging needs to happen, otherwise app, auth, db, storage are undefined in api functions.
console.log(app);

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
