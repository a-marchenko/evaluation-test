import React, { useEffect } from 'react';

import styles from './MainLayout.css';

import ChatRoomListModal from '../../features/chat/ChatRoomListModal/ChatRoomListModal';
import ShowChatRoomListButton from '../../features/chat/ShowChatRoomListButton/ShowChatRoomListButton';
import ChatRoomsAside from '../../features/chat/ChatRoomsAside/ChatRoomsAside';
import UserFigure from '../../features/profile/UserFigure/UserFigure';
import LogoutButton from '../../features/profile/LogoutButton/LogoutButton';
import AddChatRoomButton from '../../features/chat/AddChatRoomButton/AddChatRoomButton';

import { useStore } from '../../../state/store';
import useModal from '../../../hooks/useModal';

interface Props {
  main?: React.ReactFragment;
}

const MainLayout = (props: Props) => {
  const { state } = useStore();
  const { isShowing, toggle } = useModal();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <ShowChatRoomListButton onClick={toggle} />
        <ChatRoomListModal isShowing={isShowing} hide={toggle}>
          <ChatRoomsAside />
        </ChatRoomListModal>
        <UserFigure name={state.name} isCentered />
        <LogoutButton />
      </header>
      <aside className={styles.aside}>
        <ChatRoomsAside />
      </aside>
      {props.main ? (
        <main className={styles.main}>{props.main}</main>
      ) : (
        <main className={styles.mainBlank}>
          Please, choose a chat room or create a new one.
          <section className={styles.mainBlank__button}>
            <AddChatRoomButton />
          </section>
        </main>
      )}
    </div>
  );
};

export default MainLayout;
