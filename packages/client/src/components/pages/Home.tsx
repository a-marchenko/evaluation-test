import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import CenteredLayout from '../layouts/CenteredLayout/CenteredLayout';
import DefaultButton from '../common/DefaultButton/DefaultButton';

import { useStore } from '../../state/store';

const Home = () => {
  const history = useHistory();
  const { state, dispatch } = useStore();

  useEffect(() => {
    if (!state.accessToken) {
      history.push('/login');
    }
  }, []);

  const onLogout = async () => {
    try {
      // try to get new tokens
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      const result = await response.json();

      if (result.ok) {
        // if ok clear state and redirect to login
        dispatch({ type: 'UPDATE_ACCESS_TOKEN', accessToken: null });
        dispatch({ type: 'UPDATE_NAME', name: null });
        history.push('/login');
      } else {
        // if not ok redirect to login page
        window.alert(result.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CenteredLayout>
      <h1>Hello, {state.name}!</h1>
      <DefaultButton type="button" text="Logout" onClick={() => onLogout()} width={240} isPrimary />
    </CenteredLayout>
  );
};

export default Home;
