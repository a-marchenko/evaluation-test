import React from 'react';

import styles from './DefaultButton.css';

interface Props {
  type: 'button' | 'submit';
  text: string;
  isDisabled?: boolean;
  isPrimary?: boolean;
}

const DefaultButton = (props: Props) => {
  let style = styles.button;
  if (props.isPrimary) {
    style += ' ' + styles.buttonPrimary;
  }
  if (props.isDisabled) {
    style += ' ' + styles.buttonDisabled;
  }

  return (
    <button type={props.type} disabled={props.isDisabled} className={style}>
      {props.text}
    </button>
  );
};

export default DefaultButton;
