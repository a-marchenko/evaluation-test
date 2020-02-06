import React, { useRef, useLayoutEffect } from 'react';
import useStayScrolled from 'react-stay-scrolled';

import styles from './MessagesList.css';

import { Message } from '../ChatRoom/ChatRoomTypes';

import MessageItem from '../MessageItem/MessageItem';

import { useStore } from '../../../../state/store';

interface Props {
  messages: Message[];
}

const MessagesList = (props: Props) => {
  const { state } = useStore();
  const messagesRef = useRef<HTMLElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { stayScrolled } = useStayScrolled(messagesRef);

  useLayoutEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useLayoutEffect(() => {
    if (messagesRef.current !== null) {
      stayScrolled();
    }
  }, [props.messages.length]);

  return (
    <section className={styles.messages__list} ref={messagesRef}>
      {props.messages.map(message => (
        <MessageItem
          key={message.senderName + message.createdAt}
          name={message.senderName}
          text={message.text}
          createdAt={message.createdAt}
          isOwned={message.senderName === state.name}
        />
      ))}
      <div ref={messagesEndRef}></div>
    </section>
  );
};

export default MessagesList;
