import React, { memo } from 'react';

import styles from './ShowMembersButton.css';

interface Props {
  onClick: React.MouseEventHandler;
}

const ShowMembersButton = memo((props: Props) => {
  return (
    <button
      type="button"
      title="Show online participants"
      className={styles.button}
      onClick={props.onClick}
    >
      <svg viewBox="0 0 24 24" className={styles.button__icon}>
        <g data-name="people">
          <rect width="24" height="24" opacity="0" />
          <path d="M9 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4z" />
          <path d="M17 13a3 3 0 1 0-3-3 3 3 0 0 0 3 3z" />
          <path d="M21 20a1 1 0 0 0 1-1 5 5 0 0 0-8.06-3.95A7 7 0 0 0 2 20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1" />
        </g>
      </svg>
    </button>
  );
});

export default ShowMembersButton;
