import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components';
import GlobalStyle from './globalStyle';
import { app } from './firebase/firebaseApp.js';

console.log(app);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
);
