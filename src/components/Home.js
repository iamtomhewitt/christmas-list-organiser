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
          <LogoutButton />
        </div>

        <ChristmasList />

        <p></p>

        <Link to='/search'>
          <button>Search for someone's list</button>
        </Link>
      </>
    );
  }
}

export default Home;
