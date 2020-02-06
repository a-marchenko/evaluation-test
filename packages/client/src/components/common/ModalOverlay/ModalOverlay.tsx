import React from 'react';

import styles from './ModalOverlay.css';

interface Props {
  onClick?: React.MouseEventHandler;
}

const ModalOverlay = React.memo((props: Props) => {
  return <div className={styles.overlay} onClick={props.onClick}></div>;
});

export default ModalOverlay;
