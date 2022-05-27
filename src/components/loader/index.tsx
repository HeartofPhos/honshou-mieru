import React from 'react';
import classnames from 'classnames';

import './styles.css';
import logoUrl from './logo.svg';

interface Props {
  className?: string;
}

const Loader = ({ className }: Props) => (
  <img src={logoUrl} className={classnames('logo', 'animating', className)} />
);

export default Loader;
