import React from 'react';

import styles from './FormInput.css';

interface Props {
  name: string;
  type: 'text' | 'email' | 'password';
  placeholder: string;
  error?: string;
  register?: any;
}

const FormInput = (props: Props) => {
  return (
    <section className={styles.field}>
      <input
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        className={
          !props.error ? styles.field__input : styles.field__input + ' ' + styles.field__inputError
        }
        ref={props.register}
      />
      {props.error && <span className={styles.field__error}>{props.error}</span>}
    </section>
  );
};

export default FormInput;
