import React from 'react';

import { useStore } from '../../../../state/store';
import ChatRoomList from '../ChatRoomList/ChatRoomList';
import ChatRoomItem from '../ChatRoomItem/ChatRoomItem';
import AddChatRoomButton from '../AddChatRoomButton/AddChatRoomButton';

const ChatRoomsAsideView = () => {
  const { state } = useStore();

  return (
    <>
      <ChatRoomList>
        {state.chatRooms.length > 0 &&
          state.chatRooms.map(chatRoom => {
            return (
              <ChatRoomItem
                key={chatRoom.name}
                id={chatRoom.id}
                name={chatRoom.name}
                isToggled={chatRoom.id === state.toggledChatId}
              />
            );
          })}
      </ChatRoomList>
      <AddChatRoomButton />
    </>
  );
};

export default ChatRoomsAsideView;
