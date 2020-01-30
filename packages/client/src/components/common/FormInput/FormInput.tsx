import React from 'react';

import styles from './FormInput.css';

interface Props {
  type: 'text' | 'email' | 'password';
  placeholder: string;
  error?: string;
}

const FormInput = (props: Props) => {
  return (
    <section className={styles.field}>
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={
          !props.error ? styles.field__input : styles.field__input + ' ' + styles.field__inputError
        }
      />
      {props.error && <span className={styles.field__error}>{props.error}</span>}
    </section>
  );
};

export default FormInput;
