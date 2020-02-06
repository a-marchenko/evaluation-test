import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './ChatRoomItem.css';

import { useStore } from '../../../../state/store';

interface Props {
  id: number;
  name: string;
  isToggled?: boolean;
}

const ChatRoomItem = (props: Props) => {
  const [isToggled, setIsToggled] = useState(props.isToggled);
  const { state } = useStore();

  useEffect(() => {
    if (state.toggledChatId === props.id) {
      setIsToggled(true);
    } else {
      setIsToggled(false);
    }
  });

  let style = !isToggled
    ? styles.chatRoomItem
    : styles.chatRoomItem + ' ' + styles.chatRoomItemToggled;

  return (
    <Link to={`/chat/${props.id}`} className={style}>
      <svg
        className={styles.chatRoomItem__icon}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g data-name="message-square">
          <rect width="24" height="24" opacity="0" />
          <path d="M19 3H5a3 3 0 0 0-3 3v15a1 1 0 0 0 .51.87A1 1 0 0 0 3 22a1 1 0 0 0 .51-.14L8 19.14a1 1 0 0 1 .55-.14H19a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zM8 12a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm4 0a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm4 0a1 1 0 1 1 1-1 1 1 0 0 1-1 1z" />
        </g>
      </svg>
      <span className={styles.chatRoomItem__name}>{props.name}</span>
    </Link>
  );
};

export default ChatRoomItem;
