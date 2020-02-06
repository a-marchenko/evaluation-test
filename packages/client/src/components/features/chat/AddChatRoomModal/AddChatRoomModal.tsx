import React from 'react';
import { createPortal } from 'react-dom';

import styles from './AddChatRoomModal.css';

import AddChatRoomForm from '../AddChatRoomForm/AddChatRoomForm';

interface Props {
  isShowing: boolean;
  hide: React.MouseEventHandler;
}

const AddChatRoomModal = (props: Props) =>
  props.isShowing
    ? createPortal(
        <>
          <div className={styles.overlay} onClick={props.hide}></div>
          <div className={styles.modal} aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className={styles.modal__container}>
              <h2 className={styles.container__title}>Choose name for new chat</h2>
              <AddChatRoomForm hide={props.hide} />
            </div>
          </div>
        </>,
        document.body,
      )
    : null;

export default AddChatRoomModal;
