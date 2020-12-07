import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { clearLoggedInUser, getLoggedInUser } from '../../util/sessionStorage';
import Countdown from '../Countdown/Countdown';
import './Masthead.scss';

const isActive = (label, path) => (label === path ? 'active' : 'inactive');

const Masthead = (props) => {
  const firstName = getLoggedInUser()?.firstName || '';
  const { path } = props;

  return (
    <div className="masthead">
      <ul>
        <li>
          <Link className={isActive('/home', path)} to="/home">
            Home
          </Link>
        </li>

        <li>
          <Link className={isActive('/search', path)} to="/search">
            Search
          </Link>
        </li>

        <li>
          <Link className={isActive('/groups', path)} to="/groups">
            Groups
          </Link>
        </li>
      </ul>

      <div>
        <Countdown />

        <span className="logout">
          Not {firstName}?&nbsp;
          <Link to="/">
            <span onClick={() => clearLoggedInUser()}>Logout</span>
          </Link>
        </span>
      </div>

    </div>
  );
};

Masthead.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Masthead;
