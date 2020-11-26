import React from 'react';
import { Link } from 'react-router-dom';
import { clearUserData } from '../util/localStorage';
import ChristmasList from './ChristmasList/ChristmasList';

const LogoutButton = () => <Link to="/"><button onClick={() => clearUserData()}>Logout</button></Link>;

class Home extends React.Component {
  render() {
    return (
      <>
        <div className="masthead">
          <h1>Home</h1>
          <LogoutButton />
        </div>

        <ChristmasList />
      </>
    );
  }
}

export default Home;
