import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Access from '../pages/Access';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import JoinFailed from '../pages/JoinFailed';
import Chat from '../pages/Chat';

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
        <PrivateRoute path="/chat/:id">
          <Chat />
        </PrivateRoute>
        <Route path="/join_failed">
          <JoinFailed />
        </Route>
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
