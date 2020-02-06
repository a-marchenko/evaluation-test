import React, { useEffect } from 'react';

import ChatRoomsAsideView from './ChatRoomsAsideView';

import { useStore } from '../../../../state/store';

const ChatRoomsAside = () => {
  const { state, dispatch } = useStore();

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        // try to get new tokens
        const response = await fetch('/api/chat_rooms/', {
          method: 'GET',
          credentials: 'include',
          headers: {
            authorization: `Bearer ${state.accessToken}`,
          },
        });

        const result = await response.json();

        if (result.ok) {
          dispatch({ type: 'UPDATE_CHAT_ROOMS', chatRooms: result.chatRooms });
        } else {
          window.alert(result.message);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchChatRooms();
  }, []);

  return <ChatRoomsAsideView />;
};

export default ChatRoomsAside;
