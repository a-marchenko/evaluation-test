import React from 'react';
import { createPortal } from 'react-dom';

import styles from './JoinLinkModal.css';

interface Props {
  isShowing: boolean;
  hide: React.MouseEventHandler;
}

const JoinLinkModal = (props: Props) =>
  props.isShowing
    ? createPortal(
        <>
          <div className={styles.overlay} onClick={props.hide}></div>
          <div className={styles.modal} aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className={styles.modal__container}>
              <h2 className={styles.container__title}>Chat join link copied to clipboard!</h2>
            </div>
          </div>
        </>,
        document.body,
      )
    : null;

export default JoinLinkModal;
