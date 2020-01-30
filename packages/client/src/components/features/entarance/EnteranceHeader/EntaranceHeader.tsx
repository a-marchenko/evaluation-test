import React from 'react';

import styles from './EntaranceHeader.css';

interface Props {
  title: string;
  text: string;
}

const EntaranceHeader = (props: Props) => {
  return (
    <section className={styles.header}>
      <h1 className={styles.header__title}>{props.title}</h1>
      <span className={styles.header__text}>{props.text}</span>
    </section>
  );
};

export default EntaranceHeader;
