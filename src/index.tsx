import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import inDevEnvironment from './firebase/inDevEnvironment';
import GlobalStyle from './globalStyle';
import AvailableRoutes from './routes';

if (inDevEnvironment()) {
  import('./firebase/createDevEnvironment').then(({ default: creatDevEnv }) => {
    creatDevEnv();
  });
}

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
