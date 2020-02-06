import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import styles from './LoginForm.css';

import FormInput from '../../../common/FormInput/FormInput';
import DefaultButton from '../../../common/DefaultButton/DefaultButton';
import FormSwitchLink from '../FormSwitchLink/FormSwitchLink';

import { useStore } from '../../../../state/store';

interface FormData {
  name: string;
  password: string;
}

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>();
  const { register, handleSubmit, errors } = useForm<FormData>({ mode: 'onBlur' });
  const history = useHistory();
  const { dispatch } = useStore();

  const onSubmit = async (data: FormData) => {
    setSubmitError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.ok && result.UAT) {
        setIsLoading(false);
        dispatch({ type: 'UPDATE_ACCESS_TOKEN', accessToken: result.UAT });
        dispatch({ type: 'UPDATE_NAME', name: data.name });
        history.push('/home');
      } else if (result.message) {
        setIsLoading(false);
        setSubmitError(result.message);
      } else {
        setIsLoading(false);
        setSubmitError('Something went wrong :(');
      }
    } catch (err) {
      setIsLoading(false);
      setSubmitError(err.message);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {submitError && <span className={styles.form__error}>{submitError}</span>}
      <FormInput
        placeholder="Name"
        name="name"
        type="text"
        error={errors.name ? errors.name.message : ''}
        register={register({
          required: 'Name is required',
        })}
      />
      <FormInput
        placeholder="Password"
        name="password"
        type="password"
        error={errors.password ? errors.password.message : ''}
        register={register({
          required: 'Password is required',
        })}
      />
      <DefaultButton type="submit" text="Login" isLoading={isLoading} isPrimary />
      <FormSwitchLink href="/register" text="Register an account" />
    </form>
  );
};

export default LoginForm;
