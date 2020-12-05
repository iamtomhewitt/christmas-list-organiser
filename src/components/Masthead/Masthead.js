import React from 'react';
import { Link } from 'react-router-dom';
import { clearUserData, getUserData } from '../../util/localStorage';
import './Masthead.scss';

const isActive = (label, path) => (label === path ? 'active' : 'inactive');

export const Masthead = (props) => {
  const firstName = getUserData()?.firstName || '';
  const { path, countdown } = props;

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
        {countdown
          && (
            <span className="countdown">
              🎄{countdown} 🎅🏼
            </span>
          )}

        <span className="logout">
          Not {firstName}?&nbsp;
          <Link to="/">
            <span onClick={() => clearUserData()}>Logout</span>
          </Link>
        </span>
      </div>

    </div>
  );
};
