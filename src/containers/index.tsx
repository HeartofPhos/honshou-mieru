import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '../components/layout';

// containers
import Home from './home';
import NotFound from './not-found';

const App = () => (
  <Layout>
    <Switch>
      <Route from="/" component={Home} exact />
      <Route component={NotFound} />
    </Switch>
  </Layout>
);

export default App;
