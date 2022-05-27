import React from 'react';
import { Helmet } from 'react-helmet';

import './styles.css';
import notFoundUrl from './404.svg';

const NotFound = () => (
  <div className={'notFound'}>
    <Helmet title="HonshouMieru - Not Found!" />
    <h1>Uhhh</h1>
    <img src={notFoundUrl} className={'image'} />
    <p>This doesn&apos;t seem right...</p>
  </div>
);

export default NotFound;
