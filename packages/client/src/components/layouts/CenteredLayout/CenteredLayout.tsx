import React from 'react';

import styles from './CenteredLayout.css';

interface Props {
  children: React.ReactFragment;
}

const CenteredLayout = (props: Props) => {
  return <main className={styles.container}>{props.children}</main>;
};

export default CenteredLayout;
