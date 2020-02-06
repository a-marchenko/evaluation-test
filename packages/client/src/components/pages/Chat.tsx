import React from 'react';
import { useParams } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout/MainLayout';
import ChatRoom from '../features/chat/ChatRoom/ChatRoom';

const Chat = () => {
  const { id } = useParams();
  const chatId = parseInt(id);

  let Main: React.ReactFragment | undefined = undefined;

  if (chatId) {
    Main = <ChatRoom chatId={chatId} />;
  }

  return <MainLayout main={Main} />;
};

export default Chat;
