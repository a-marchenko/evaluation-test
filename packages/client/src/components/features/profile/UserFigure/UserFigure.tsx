import React from 'react';

import styles from './UserFigure.css';

interface Props {
  name: string;
  isCentered?: boolean;
}

const UserFigure = React.memo((props: Props) => {
  let style = !props.isCentered ? styles.user : styles.user + ' ' + styles.userCentered;

  return (
    <figure className={style}>
      <div className={styles.user__avatar}>
        <div className={styles.avatar__label}>{props.name[0]}</div>
      </div>
      <figcaption className={styles.user__name}>{props.name}</figcaption>
    </figure>
  );
});

export default UserFigure;
