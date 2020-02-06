import React from 'react';

import styles from './SendMessageButton.css';

interface Props {
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: React.MouseEventHandler;
}

const SendMessageButton = (props: Props) => {
  let style = !props.isDisabled ? styles.button : styles.button + ' ' + styles.buttonDisabled;

  return (
    <button
      type="submit"
      disabled={props.isDisabled || props.isLoading}
      onClick={props.onClick}
      className={style}
    >
      {props.isLoading ? (
        <div className={styles.button__spinner}></div>
      ) : (
        <svg className={styles.button__icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g data-name="paper-plane">
            <rect width="24" height="24" opacity="0" />
            <path d="M21 4a1.31 1.31 0 0 0-.06-.27v-.09a1 1 0 0 0-.2-.3 1 1 0 0 0-.29-.19h-.09a.86.86 0 0 0-.31-.15H20a1 1 0 0 0-.3 0l-18 6a1 1 0 0 0 0 1.9l8.53 2.84 2.84 8.53a1 1 0 0 0 1.9 0l6-18A1 1 0 0 0 21 4zm-4.7 2.29l-5.57 5.57L5.16 10zM14 18.84l-1.86-5.57 5.57-5.57z" />
          </g>
        </svg>
      )}
    </button>
  );
};

export default SendMessageButton;
