import React from 'react';
import { Link } from 'react-router-dom';

import styles from './FormSwitchLink.css';

interface Props {
  href: string;
  text: string;
}

const FormSwitchLink = (props: Props) => {
  return (
    <Link to={props.href} className={styles.link}>
      {props.text}
    </Link>
  );
};

export default FormSwitchLink;
