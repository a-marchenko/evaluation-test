import React from 'react';

import styles from './StreamActionButton.css';

interface Props {
  onClick: React.MouseEventHandler;
  isStreaming?: boolean;
}

const StreamActionButton = (props: Props) => {
  return (
    <button
      type="button"
      title={props.isStreaming ? 'Stop streaming' : 'Start streaming'}
      className={styles.streamAction}
      onClick={props.onClick}
    >
      {props.isStreaming ? (
        <svg className={styles.streamAction__icon} viewBox="0 0 24 24">
          <g data-name="video-off">
            <rect width="24" height="24" opacity="0" />
            <path d="M14.22 17.05L4.88 7.71 3.12 6 3 5.8A3 3 0 0 0 2 8v8a3 3 0 0 0 3 3h9a2.94 2.94 0 0 0 1.66-.51z" />
            <path d="M21 7.15a1.7 1.7 0 0 0-1.85.3l-2.15 2V8a3 3 0 0 0-3-3H7.83l1.29 1.29 6.59 6.59 2 2 2 2a1.73 1.73 0 0 0 .6.11 1.68 1.68 0 0 0 .69-.15 1.6 1.6 0 0 0 1-1.48V8.63a1.6 1.6 0 0 0-1-1.48z" />
            <path d="M17 15.59l-2-2L8.41 7l-2-2-1.7-1.71a1 1 0 0 0-1.42 1.42l.54.53L5.59 7l9.34 9.34 1.46 1.46 2.9 2.91a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
          </g>
        </svg>
      ) : (
        <svg className={styles.streamAction__icon} viewBox="0 0 24 24">
          <g data-name="video">
            <rect width="24" height="24" opacity="0" />
            <path d="M21 7.15a1.7 1.7 0 0 0-1.85.3l-2.15 2V8a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-1.45l2.16 2a1.74 1.74 0 0 0 1.16.45 1.68 1.68 0 0 0 .69-.15 1.6 1.6 0 0 0 1-1.48V8.63A1.6 1.6 0 0 0 21 7.15z" />
          </g>
        </svg>
      )}
    </button>
  );
};

export default StreamActionButton;
