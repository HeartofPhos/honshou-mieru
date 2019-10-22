import React from 'react';
import classnames from 'classnames';

import { ReactComponent as Logo } from './logo.svg';

import styles from './styles.css';

interface Props {
  className?: string;
}

const Loader = ({ className }: Props) => (
  <Logo className={classnames(styles.logo, styles.animating, className)} />
);

export default Loader;
