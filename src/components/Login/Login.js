import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { validateAccount } from '../../api/account';
import { getUserData, saveUserData } from '../../util/localStorage';

import './Login.scss';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
    };

    this.login.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  login = () => {
    const { email, password } = this.state;

    validateAccount(email, password)
      .then((data) => {
        if (data.error) {
          this.setState({ errorMessage: data.message });
        } else {
          saveUserData(data);
          this.props.history.push('/home');
        }
      });
  }

  render() {
    const { email, password, errorMessage } = this.state;

    return (
      <>
        {getUserData() ? <Redirect to="/home" />
          : (
            <div className="login">
              <h1>Login</h1>
              <input value={email} placeholder="email" onChange={this.handleChange} id="email" type="email" />
              <input value={password} placeholder="password" onChange={this.handleChange} id="password" type="password" />
              <button disabled={email === '' || password === ''} onClick={this.login}>Login</button>

              <Link to="/register">
                <div>Register</div>
              </Link>

              {errorMessage
                && <div>{errorMessage}</div>}
            </div>
          )}
      </>
    );
  }
}
