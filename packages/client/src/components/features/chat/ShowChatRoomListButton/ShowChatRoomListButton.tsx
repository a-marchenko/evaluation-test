import React, { memo } from 'react';

import styles from './ShowChatRoomListButton.css';

interface Props {
  onClick: React.MouseEventHandler;
}

const ShowChatRoomListButton = memo((props: Props) => {
  return (
    <button
      type="button"
      title="Show chat room list"
      className={styles.button}
      onClick={props.onClick}
    >
      <svg className={styles.button__icon} viewBox="0 0 512.007 512.007">
        <path d="M482.004 182h-301c-16.542 0-30 13.458-30 30v210c0 16.542 13.458 30 30 30h248.859l56.622 55.694c9.442 9.287 25.519 2.591 25.519-10.694V212c0-16.542-13.458-30-30-30zm-46 209h-210c-8.284 0-15-6.716-15-15s6.716-15 15-15h210c8.284 0 15 6.716 15 15s-6.716 15-15 15zm-225-75c0-8.284 6.716-15 15-15h150c8.284 0 15 6.716 15 15s-6.716 15-15 15h-150c-8.285 0-15-6.716-15-15zm225-45h-210c-8.284 0-15-6.716-15-15s6.716-15 15-15h210c8.284 0 15 6.716 15 15s-6.716 15-15 15z" />
        <path d="M361.004 152V30c0-16.54-13.46-30-30-30h-301c-16.54 0-30 13.46-30 30v285c0 13.352 16.13 19.949 25.52 10.69L82.144 270h38.86v-58c0-33.084 26.916-60 60-60zm-75-1c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm-210-90h210c8.284 0 15 6.716 15 15s-6.716 15-15 15h-210c-8.284 0-15-6.716-15-15s6.715-15 15-15zm30 150h-30c-8.284 0-15-6.716-15-15s6.716-15 15-15h30c8.284 0 15 6.716 15 15s-6.716 15-15 15zm-30-60c-8.284 0-15-6.716-15-15s6.716-15 15-15h150c8.284 0 15 6.716 15 15s-6.716 15-15 15z" />
      </svg>
    </button>
  );
});

export default ShowChatRoomListButton;
