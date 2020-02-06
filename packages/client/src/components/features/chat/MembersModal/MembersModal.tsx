import React from 'react';
import { createPortal } from 'react-dom';

import styles from './MembersModal.css';

import ModalOverlay from '../../../common/ModalOverlay/ModalOverlay';

interface Props {
  isShowing: boolean;
  hide: React.MouseEventHandler;
  children: React.ReactFragment;
}

const MembersModal = (props: Props) =>
  props.isShowing
    ? createPortal(
        <>
          <ModalOverlay onClick={props.hide} />
          <div className={styles.modal} aria-modal aria-hidden tabIndex={-1} role="dialog">
            <aside className={styles.modal__aside}>{props.children}</aside>
          </div>
        </>,
        document.body,
      )
    : null;

export default MembersModal;
