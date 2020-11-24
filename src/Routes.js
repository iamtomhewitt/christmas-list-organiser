import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login/Login';

export default () => {
  return (
    <Switch>
      <Route path="/" exact render={() => <Login />} />
      <Route path="/home" exact render={() => <Home />} />
    </Switch>
  );
}
