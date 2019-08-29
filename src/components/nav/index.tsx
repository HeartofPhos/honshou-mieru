import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from './logo.svg';

import styles from './styles.css';

const Nav = () => (
  <nav className={styles.nav}>
    <Link className={styles.logoLink} to="/">
      <Logo className={styles.logo} />
      <h1 className={styles.logoText}>HonshouMieru</h1>
    </Link>
  </nav>
);

export default Nav;
