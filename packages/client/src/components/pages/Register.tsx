import React from 'react';

import CenteredLayout from '../layouts/CenteredLayout/CenteredLayout';
import EnteranceHeader from '../features/enterance/EnteranceHeader/EnteranceHeader';
import RegisterForm from '../features/enterance/RegisterForm/RegisterForm';

const Register = () => {
  return (
    <CenteredLayout>
      <EnteranceHeader title="Register an account" text="Please, register an account to use chat" />
      <RegisterForm />
    </CenteredLayout>
  );
};

export default Register;
