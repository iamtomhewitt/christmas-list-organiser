import React from 'react';
import Routes from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { clearUserData, getUserData } from './util/localStorage';
import { Link, withRouter } from 'react-router-dom';

const LogoutButton = () => <Link to="/"><button onClick={() => clearUserData()}>Logout</button></Link>;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: null,
    };
  }

  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      const data = getUserData();
      this.setState({ userData: data });
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const { userData } = this.state;
    return (
      <>
        {userData && <LogoutButton />}
        <Routes />
      </>
    );
  }
}

export default withRouter(App);
