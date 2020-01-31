import React from 'react';

import Router from './routes/Router';

import { StoreProvider } from '../state/store';

const App = () => {
  return (
    <StoreProvider>
      <Router />
    </StoreProvider>
  );
};

export default App;
