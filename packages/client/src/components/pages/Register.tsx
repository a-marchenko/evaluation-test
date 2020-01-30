import React from 'react';

import EntaranceLayout from '../layouts/EnteranceLayout/EntaranceLayout';
import EntaranceHeader from '../features/entarance/EnteranceHeader/EntaranceHeader';
import RegisterForm from '../features/entarance/RegisterForm/RegisterForm';

const Register = () => {
  return (
    <EntaranceLayout>
      <EntaranceHeader title="Register an account" text="Please, register an account to use chat" />
      <RegisterForm />
    </EntaranceLayout>
  );
};

export default Register;
