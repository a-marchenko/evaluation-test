import React from 'react';

import styles from './LogoutButton.css';

interface Props {
  onClick: React.MouseEventHandler;
}

const LogoutButtonView = (props: Props) => {
  return (
    <button type="button" title="Logout" className={styles.button} onClick={props.onClick}>
      <svg viewBox="0 0 24 24" className={styles.button__icon}>
        <g data-name="logout">
          <rect width="24" height="24" transform="rotate(-90 12 12)" opacity="0" />
          <path d="M19 4h-2a1 1 0 0 0 0 2h1v12h-1a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z" />
          <path d="M11.8 7.4a1 1 0 0 0-1.6 1.2L12 11H4a1 1 0 0 0 0 2h8.09l-1.72 2.44a1 1 0 0 0 .24 1.4 1 1 0 0 0 .58.18 1 1 0 0 0 .81-.42l2.82-4a1 1 0 0 0 0-1.18z" />
        </g>
      </svg>
    </button>
  );
};

export default LogoutButtonView;
