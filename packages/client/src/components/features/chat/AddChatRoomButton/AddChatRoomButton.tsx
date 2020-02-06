import React, { memo } from 'react';

import styles from './AddChatRoomButton.css';

import AddChatRoomModal from '../AddChatRoomModal/AddChatRoomModal';

import useModal from '../../../../hooks/useModal';

const AddChatRoomButton = memo(() => {
  const { isShowing, toggle } = useModal();

  return (
    <>
      <button
        type="button"
        title="Add new chat room"
        className={styles.addChatRoom}
        onClick={toggle}
      >
        <svg
          className={styles.addChatRoom__icon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g data-name="plus">
            <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0" />
            <path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z" />
          </g>
        </svg>
      </button>
      <AddChatRoomModal isShowing={isShowing} hide={toggle} />
    </>
  );
});

export default AddChatRoomButton;
