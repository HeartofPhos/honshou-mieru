import React from 'react';

import './styles.css';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
  <>
    <main className={"container"}>{children}</main>
  </>
);

export default Layout;
