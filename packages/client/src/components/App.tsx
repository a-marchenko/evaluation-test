import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Access from './pages/Access';
import NotFound from './pages/NotFound';
import { StoreProvider } from '../state/store';
import Home from './pages/Home';

const App = () => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/access">
            <Access />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route
            path="/"
            exact={true}
            render={({ location }) => (
              <Redirect
                to={{
                  pathname: '/home',
                  state: { from: location },
                }}
              />
            )}
          />
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </StoreProvider>
  );
};

export default App;
