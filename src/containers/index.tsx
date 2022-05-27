import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from '../components/layout';

import Home from './home';
import NotFound from './not-found';

const App = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<NotFound />} />
    </Routes>
  </Layout>
);

export default App;
