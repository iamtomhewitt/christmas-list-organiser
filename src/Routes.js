import React from 'react';
import { Route, Switch } from 'react-router-dom';

export default () => (
  <Switch>
    <Route path="/" exact component={<div>Hey boy</div>} />

    { /* Catch all unmatched routes */}
    <Route component={<div>Not Found</div>} />
  </Switch>
);
