import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ChristmasList from './components/ChristmasList/ChristmasList';
import Groups from './components/Groups/Groups';
import Home from './components/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import SearchPage from './components/Search/Search';
import { getUserData } from './util/localStorage';

export default () => {
  const user = getUserData();

  console.log('Routes', user);

  if (!user) {
    console.log('no user');
  }

  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/home" exact component={user ? Home : Login} />
      <Route path="/search" exact component={user ? SearchPage : Login} />
      <Route path="/christmasList" exact component={user ? ChristmasList : Login} />
      <Route path="/groups" exact component={user ? Groups : Login} />
    </Switch>
  );
};
