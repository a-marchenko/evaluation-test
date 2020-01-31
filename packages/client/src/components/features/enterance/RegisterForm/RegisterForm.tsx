import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import styles from './RegisterForm.css';

import FormInput from '../../../common/FormInput/FormInput';
import DefaultButton from '../../../common/DefaultButton/DefaultButton';
import FormSwitchLink from '../FormSwitchLink/FormSwitchLink';

import { useStore } from '../../../../state/store';

interface FormData {
  name: string;
  password: string;
  repeatedPassword: string;
}

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>();
  const { register, handleSubmit, errors, watch } = useForm<FormData>({ mode: 'onChange' });
  const history = useHistory();
  const { dispatch } = useStore();

  const onSubmit = async (data: FormData) => {
    setSubmitError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ name: data.name, password: data.password }),
      });

      const result = await response.json();

      if (result.ok && result.UAT) {
        setIsLoading(false);
        dispatch({ type: 'UPDATE_ACCESS_TOKEN', accessToken: result.UAT });
        dispatch({ type: 'UPDATE_NAME', name: data.name });
        history.push('/home');
      } else if (result.message) {
        setIsLoading(false);
        setSubmitError(result.message.split('Error: ')[1]);
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
        placeholder="Choose name"
        name="name"
        type="text"
        error={errors.name ? errors.name.message : ''}
        register={register({
          required: 'Name is required',
          minLength: { value: 2, message: 'Min length is 2 characters' },
          maxLength: { value: 16, message: 'Max length is 16 characters' },
          pattern: { value: /^\w+$/i, message: 'Only characters and underscores availibale' },
        })}
      />
      <FormInput
        placeholder="Choose password"
        name="password"
        type="password"
        error={errors.password ? errors.password.message : ''}
        register={register({
          required: 'Password is required',
          minLength: { value: 4, message: 'Min length is 4 characters' },
        })}
      />
      <FormInput
        placeholder="Repeat password"
        name="repeatedPassword"
        type="password"
        error={errors.repeatedPassword ? errors.repeatedPassword.message : ''}
        register={register({
          required: 'Please, repeat the password',
          validate: value => value === watch('password') || "Passwords don't match",
        })}
      />
      <DefaultButton type="submit" text="Register" isLoading={isLoading} isPrimary />
      <FormSwitchLink href="/login" text="Login to account" />
    </form>
  );
};

export default RegisterForm;
