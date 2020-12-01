import React from 'react';
import { Link } from 'react-router-dom';
import { getUserData } from '../util/localStorage';
import ChristmasList from './ChristmasList/ChristmasList';

export const Home = (props) => {
  const { email } = props.location || getUserData();

  return (
    <>
      <ChristmasList email={email} />

      <p />

      <Link to="/groups">
        <button>Join a group</button>
      </Link>
    </>
  );
};

export default Home;
