import React from 'react';

import styles from './RegisterForm.css';

import FormInput from '../../../common/FormInput/FormInput';
import DefaultButton from '../../../common/DefaultButton/DefaultButton';
import FormSwitchLink from '../FormSwitchLink/FormSwitchLink';

const RegisterForm = () => {
  return (
    <form className={styles.form}>
      <FormInput type="text" placeholder="Choose name" />
      <FormInput type="password" placeholder="Choose password" />
      <FormInput type="password" placeholder="Repeat password" />
      <DefaultButton type="button" text="Register" isPrimary />
      <FormSwitchLink href="/login" text="Login to account" />
    </form>
  );
};

export default RegisterForm;
