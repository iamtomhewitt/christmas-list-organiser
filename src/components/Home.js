import React from 'react';
import { getUserData } from '../util/localStorage';
import ChristmasList from './ChristmasList/ChristmasList';

export const Home = (props) => {
  const { email } = props.location || getUserData();

  return (
    <ChristmasList email={email} />
  );
};

export default Home;
