import React, { memo } from 'react';

import styles from './CopyJoinLinkButton.css';

import JoinLinkModal from '../JoinLinkCopiedModal/JoinLinkModal';

import useModal from '../../../../hooks/useModal';

interface Props {
  chatToken: string;
}

const CopyJoinLinkButton = memo((props: Props) => {
  const { isShowing, toggle } = useModal();

  const copyLinkToClipboard = async () => {
    // copy join link to clipboard
    await navigator.clipboard.writeText(
      `https://localhost:5000/api/chat_rooms/join/${props.chatToken}`,
    );

    // toggle message modal
    toggle();
  };

  return (
    <>
      <button
        type="button"
        title="Copy join chat link"
        className={styles.button}
        onClick={() => copyLinkToClipboard()}
      >
        <svg viewBox="0 0 24 24" className={styles.button__icon}>
          <g data-name="copy">
            <rect width="24" height="24" opacity="0" />
            <path d="M18 9h-3V5.67A2.68 2.68 0 0 0 12.33 3H5.67A2.68 2.68 0 0 0 3 5.67v6.66A2.68 2.68 0 0 0 5.67 15H9v3a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3zm-9 3v1H5.67a.67.67 0 0 1-.67-.67V5.67A.67.67 0 0 1 5.67 5h6.66a.67.67 0 0 1 .67.67V9h-1a3 3 0 0 0-3 3z" />
          </g>
        </svg>
      </button>
      <JoinLinkModal isShowing={isShowing} hide={toggle} />
    </>
  );
});

export default CopyJoinLinkButton;
