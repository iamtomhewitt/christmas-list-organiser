import React from 'react';
import { getUserData } from '../util/localStorage';
import ChristmasList from './ChristmasList/ChristmasList';
import { version } from '../../package.json';
import './Home.scss';

export const Home = (props) => {
  const { email } = props.location || getUserData();

  return (
    <>
      <ChristmasList email={email} />
      <div className="version">version {version}</div>
    </>
  );
};

export default Home;
