import React from 'react';

import styles from './DefaultButton.css';

interface Props {
  type: 'button' | 'submit';
  text: string;
  width?: number;
  isPrimary?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: React.MouseEventHandler;
}

const DefaultButton = (props: Props) => {
  let styleClass = styles.button;
  if (props.isPrimary) {
    styleClass += ' ' + styles.buttonPrimary;
  }
  if (props.isDisabled) {
    styleClass += ' ' + styles.buttonDisabled;
  }

  let styleWidth = props.width ? { width: props.width + 'px' } : {};

  return (
    <button
      type={props.type}
      disabled={props.isDisabled || props.isLoading}
      onClick={props.onClick}
      className={styleClass}
      style={styleWidth}
    >
      {props.isLoading ? (
        <div
          className={
            !props.isPrimary
              ? styles.button__spinner
              : styles.button__spinner + ' ' + styles.button__spinnerPrimary
          }
        ></div>
      ) : (
        props.text
      )}
    </button>
  );
};

export default DefaultButton;
