import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import Routes from './Routes';
import { Link, useLocation } from 'react-router-dom';
import { clearUserData, getUserData } from './util/localStorage';

const LogoutButton = () =>
  <Link to="/">
    <button onClick={() => clearUserData()}>Logout</button>
  </Link>;

const App = () => {
  const location = useLocation();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData(getUserData())
  }, [location]);

  return (
    <>
      {userData && <LogoutButton />}
      <Routes />
    </>
  );
};

export default App;
