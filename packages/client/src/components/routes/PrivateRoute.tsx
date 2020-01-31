import React, { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { useStore } from '../../state/store';

const PrivateRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { state } = useStore();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        state.accessToken ? (
          children
        ) : (
          <Redirect to={`/access?target=${encodeURI(location.pathname)}`} />
        )
      }
    />
  );
};

export default PrivateRoute;
