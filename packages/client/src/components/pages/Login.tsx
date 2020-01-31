import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import CenteredLayout from '../layouts/CenteredLayout/CenteredLayout';
import EnteranceHeader from '../features/enterance/EnteranceHeader/EnteranceHeader';
import LoginForm from '../features/enterance/LoginForm/LoginForm';

import { useStore } from '../../state/store';

const Login = () => {
  const { state } = useStore();
  const history = useHistory();

  useEffect(() => {
    if (state.accessToken) {
      history.push('/home');
    }
  }, []);

  return (
    <CenteredLayout>
      <EnteranceHeader title="Login to account" text="Please, login to your account to use chat" />
      <LoginForm />
    </CenteredLayout>
  );
};

export default Login;
