import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';

import LogoutButtonView from './LogoutButtonView';

import { useStore } from '../../../../state/store';

const LogoutButton = memo(() => {
  const { dispatch } = useStore();
  const history = useHistory();

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
        dispatch({ type: 'UPDATE_TOGGLED_CHAT_ID', toggledChatId: null });
        history.push('/login');
      } else {
        // if not ok redirect to login page
        window.alert(result.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return <LogoutButtonView onClick={onLogout} />;
});

export default LogoutButton;
