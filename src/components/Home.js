import React from 'react';
import { getUserData } from '../util/localStorage';
import LogoutButton from './Buttons/Logout';

const Home = () => (
  <>
    <div>Home</div>
    <LogoutButton />
    <div>
      {JSON.stringify(getUserData())}
    </div>
  </>
);

export default Home;
