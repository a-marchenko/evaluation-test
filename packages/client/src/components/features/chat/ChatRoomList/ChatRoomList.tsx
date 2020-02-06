import React, { memo } from 'react';

import styles from './ChatRoomList.css';

interface Props {
  children?: React.ReactFragment;
}

const ChatRoomList = memo((props: Props) => {
  return (
    <section className={styles.chatRoomList}>
      <h3 className={styles.chatRoomList__title}>Your chat rooms</h3>
      {props.children ? (
        props.children
      ) : (
        <span className={styles.chatRoomList__blank}>You have no chats yet</span>
      )}
    </section>
  );
});

export default ChatRoomList;
