import React from 'react';

import styles from './UserFigure.css';

interface Props {
  name: string;
}

const UserFigure = React.memo((props: Props) => {
  return (
    <figure className={styles.user}>
      <div className={styles.user__avatar}>
        <div className={styles.avatar__label}>{props.name[0]}</div>
      </div>
      <figcaption className={styles.user__name}>{props.name}</figcaption>
    </figure>
  );
});

export default UserFigure;
