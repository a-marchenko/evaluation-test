import React from 'react';

import EntaranceLayout from '../layouts/EnteranceLayout/EntaranceLayout';
import EntaranceHeader from '../features/entarance/EnteranceHeader/EntaranceHeader';
import LoginForm from '../features/entarance/LoginForm/LoginForm';

const Login = () => {
  return (
    <EntaranceLayout>
      <EntaranceHeader title="Login to account" text="Please, login to your account to use chat" />
      <LoginForm />
    </EntaranceLayout>
  );
};

export default Login;
