import React from 'react';
import { getUserData } from '../util/localStorage';

const Home = () => (
  <>
    <div>Home</div>
    <div>
      {JSON.stringify(getUserData())}
    </div>
  </>
);

export default Home;
