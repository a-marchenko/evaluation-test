import React from 'react';

import styles from './LoginForm.css';

import FormInput from '../../../common/FormInput/FormInput';
import DefaultButton from '../../../common/DefaultButton/DefaultButton';
import FormSwitchLink from '../FormSwitchLink/FormSwitchLink';

const LoginForm = () => {
  return (
    <form className={styles.form}>
      <FormInput type="text" placeholder="Name" />
      <FormInput type="password" placeholder="Password" />
      <DefaultButton type="button" text="Login" isPrimary />
      <FormSwitchLink href="/register" text="Register an account" />
    </form>
  );
};

export default LoginForm;
