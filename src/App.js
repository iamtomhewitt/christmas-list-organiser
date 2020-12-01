import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Routes from './Routes';
import { Masthead } from './components/Masthead/Masthead';
import { getUserData } from './util/localStorage';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const location = useLocation();
  const { pathname } = location;
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData(getUserData());
  }, [location]);

  return (
    <>
      {userData && <Masthead path={pathname} />}
      <Routes />
    </>
  );
};

export default App;
