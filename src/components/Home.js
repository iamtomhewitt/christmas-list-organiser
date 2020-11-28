import React from 'react';
import { Link } from 'react-router-dom';
import { clearUserData, getUserData } from '../util/localStorage';
import ChristmasList from './ChristmasList/ChristmasList';

const LogoutButton = () => <Link to="/"><button onClick={() => clearUserData()}>Logout</button></Link>;

class Home extends React.Component {
  render() {
    const { email } = this.props.location || getUserData();

    return (
      <>
        <div className="masthead">
          <LogoutButton />
        </div>

        <ChristmasList email={email} />

        <p />

        <Link to="/search">
          <button>Search for someone's list</button>
        </Link>
      </>
    );
  }
}

export default Home;
