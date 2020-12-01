import React from 'react';
import { Link } from 'react-router-dom';
import { clearUserData, getUserData } from '../../util/localStorage';

export const Masthead = () => {
  const firstName = getUserData()?.firstName || '';

  return (
    <>
      <Link to="/home">
        Home
      </Link>
      &nbsp;
      <Link to="/search">
        Search
      </Link>
      &nbsp;
      <Link to="/groups">
        Groups
      </Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>
        Not {firstName}?&nbsp;
        <Link to="/">
          <span onClick={() => clearUserData()}>Logout</span>
        </Link>
      </span>
    </>
  );
};
