import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

export default () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/register" exact render={() => <Register />} />
    <Route path="/home" exact render={() => <Home />} />
  </Switch>
);
