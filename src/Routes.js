import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ChristmasList from './components/ChristmasList/ChristmasList';
import Home from './components/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import SearchPage from './components/Search/Search';

export default () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/register" exact component={Register} />
    <Route path="/home" exact component={Home} />
    <Route path="/search" exact component={SearchPage} />
    <Route path="/christmasList" exact component={ChristmasList} />
  </Switch>
);
