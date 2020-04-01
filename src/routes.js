import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './pages/Main';
import Finished from './pages/Finished';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/finished" component={Finished} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
