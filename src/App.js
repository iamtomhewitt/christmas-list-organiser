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
  const [countdown, setCountdown] = useState();

  useEffect(() => {
    setUserData(getUserData());
  }, [location]);

  useEffect(() => {
    const interval = setInterval(() => {
      const christmasDay = new Date('Dec 25, 2020 00:00:00').getTime();

      const now = new Date().getTime();
      const distance = christmasDay - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);

      if (distance < 0) {
        clearInterval(interval);
        setCountdown('It\'s Christmas!');
      }
    }, 1000);
  }, []);

  return (
    <>
      {userData && <Masthead path={pathname} countdown={countdown} />}
      <Routes />
    </>
  );
};

export default App;
