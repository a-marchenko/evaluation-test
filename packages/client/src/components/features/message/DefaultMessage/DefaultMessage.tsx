import React from 'react';

import styles from './DefaultMessage.css';

interface Props {
  title: string;
  text: string;
}

const DefaultMessage = (props: Props) => {
  return (
    <section className={styles.message}>
      <h1 className={styles.message__title}>{props.title}</h1>
      <span className={styles.message__text}>{props.text}</span>
    </section>
  );
};

export default DefaultMessage;
