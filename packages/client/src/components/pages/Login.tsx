import React from 'react';

import CenteredLayout from '../layouts/CenteredLayout/CenteredLayout';
import EnteranceHeader from '../features/enterance/EnteranceHeader/EnteranceHeader';
import LoginForm from '../features/enterance/LoginForm/LoginForm';

const Login = () => {
  return (
    <CenteredLayout>
      <EnteranceHeader title="Login to account" text="Please, login to your account to use chat" />
      <LoginForm />
    </CenteredLayout>
  );
};

export default Login;
