import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import CenteredLayout from '../layouts/CenteredLayout/CenteredLayout';
import EnteranceHeader from '../features/enterance/EnteranceHeader/EnteranceHeader';
import RegisterForm from '../features/enterance/RegisterForm/RegisterForm';

import { useStore } from '../../state/store';

const Register = () => {
  const { state } = useStore();
  const history = useHistory();

  useEffect(() => {
    if (state.accessToken) {
      history.push('/home');
    }
  }, []);

  return (
    <CenteredLayout>
      <EnteranceHeader title="Register an account" text="Please, register an account to use chat" />
      <RegisterForm />
    </CenteredLayout>
  );
};

export default Register;
