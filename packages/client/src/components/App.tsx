import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route
          path="/"
          render={({ location }) => (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
