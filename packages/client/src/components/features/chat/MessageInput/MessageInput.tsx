import React from 'react';

import styles from './MessageInput.css';

interface Props {
  error?: string;
  register?: any;
}

const MessageInput = (props: Props) => {
  return (
    <section className={styles.field}>
      <input
        name="message"
        type="text"
        placeholder="Enter your message"
        className={
          !props.error ? styles.field__input : styles.field__input + ' ' + styles.field__inputError
        }
        ref={props.register}
      />
    </section>
  );
};

export default MessageInput;
