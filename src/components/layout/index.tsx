import React from 'react';

import styles from './styles.css';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
  <>
    <main className={styles.container}>{children}</main>
  </>
);

export default Layout;
