import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Search from './components/Search/Search';

export default () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/register" exact component={Register} />
    <Route path="/home" exact component={Home} />
    <Route path="/search" exact component={Search} />
  </Switch>
);
