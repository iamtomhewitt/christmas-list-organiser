import React from 'react';
import PropTypes from 'prop-types';
import { getUserData } from '../util/localStorage';
import ChristmasList from './ChristmasList/ChristmasList';
import { version } from '../../package.json';
import './Home.scss';

export const Home = (props) => {
  const { location } = props;
  const { email } = location || getUserData();

  return (
    <>
      <ChristmasList email={email} />
      <p className="version">version {version}</p>
    </>
  );
};

Home.propTypes = {
  location: PropTypes.object,
};

export default Home;
