import React from 'react';

import styles from './MessageItem.css';

interface Props {
  name: string;
  text: string;
  createdAt: string;
  isOwned: boolean;
}

const MessageItem = (props: Props) => {
  let style = !props.isOwned ? styles.message : styles.message + ' ' + styles.messageOwned;
  return (
    <section className={style}>
      <div className={styles.message__avatar}>
        <div className={styles.avatar__label}>{props.name[0]}</div>
      </div>
      <section
        className={
          !props.isOwned
            ? styles.message__content
            : styles.message__content + ' ' + styles.message__contentOwned
        }
      >
        <section
          className={
            !props.isOwned
              ? styles.content__text
              : styles.content__text + ' ' + styles.content__textOwned
          }
        >
          {props.text}
        </section>
        <section className={styles.content__date}>{props.createdAt}</section>
      </section>
    </section>
  );
};

export default MessageItem;
