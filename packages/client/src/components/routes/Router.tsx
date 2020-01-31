import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Access from '../pages/Access';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import PrivateRoute from './PrivateRoute';

const Router = () => {
  return (
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
        <PrivateRoute path="/home">
          <Home />
        </PrivateRoute>
        <Route
          path="/"
          exact={true}
          render={() => (
            <Redirect
              to={{
                pathname: '/home',
              }}
            />
          )}
        />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
