import React from 'react';

import styles from './RedirectMessage.css';

interface Props {
  title: string;
  text: string;
  path: string;
}

const RedirectMessage = (props: Props) => {
  return (
    <section className={styles.message}>
      <h1 className={styles.message__title}>{props.title}</h1>
      <span className={styles.message__text}>{props.text}</span>
      <span className={styles.message__path}>{props.path}</span>
    </section>
  );
};

export default RedirectMessage;
