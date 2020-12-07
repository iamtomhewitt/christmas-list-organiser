import React from 'react';
import PropTypes from 'prop-types';
import { getLoggedInUser } from '../util/sessionStorage';
import ChristmasList from './ChristmasList/ChristmasList';
import { version } from '../../package.json';
import './Home.scss';

const Home = (props) => {
  const { location } = props;
  const { email } = location || getLoggedInUser();

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
