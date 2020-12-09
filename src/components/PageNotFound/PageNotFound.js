import React from 'react';
import { Link } from 'react-router-dom';
import { generateClass } from '../../util';
import './PageNotFound.scss';

const PageNotFound = () => (
  <>
    <div className={generateClass('page-not-found')}>
      <span role="img" aria-label="santa">🎅🏼</span>
      <p>Woops! Could not find the page you were looking for!</p>
      <Link to="/home"><button type="button">Back Home</button></Link>
    </div>
  </>
);

export default PageNotFound;
