import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import CenteredLayout from '../layouts/CenteredLayout/CenteredLayout';
import RedirectMessage from '../features/redirect/RedirectMessage/RedirectMessage';

import useQuery from '../../hooks/useQuery';
import { useStore } from '../../state/store';

const Access = () => {
  const history = useHistory();
  const query = useQuery();
  const { dispatch } = useStore();

  const rawPath = query.get('target');
  const path = rawPath ? rawPath.replace('%2F', '/') : '';

  useEffect(() => {
    const fetchAndRedirect = async () => {
      try {
        // try to get new tokens
        const response = await fetch('/api/auth/refresh', {
          method: 'POST',
          credentials: 'include',
        });

        const result = await response.json();

        if (result.ok && result.UAT && result.name) {
          // if ok redirect to requested page
          dispatch({ type: 'UPDATE_ACCESS_TOKEN', accessToken: result.UAT });
          dispatch({ type: 'UPDATE_NAME', name: result.name });
          history.push(path);
        } else {
          // if not ok redirect to login page
          history.push('/login');
        }
      } catch (err) {
        console.error(err);
        // if not ok redirect to login page
        history.push('/login');
      }
    };
    fetchAndRedirect();
  }, []);

  return (
    <CenteredLayout>
      <RedirectMessage
        title="Authenticating"
        text="You will be redirected to:"
        path={path.toString()}
      />
    </CenteredLayout>
  );
};

export default Access;
