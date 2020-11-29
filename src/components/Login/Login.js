import React from 'react';
import { Link } from 'react-router-dom';
import { validateAccount } from '../../api/account';
import { saveUserData } from '../../util/localStorage';

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
      <div>
        <h1>Login</h1>
        <input value={email} onChange={this.handleChange} id="email" />
        <p />
        <input value={password} onChange={this.handleChange} id="password" type="password" />
        <p />
        <button disabled={email === '' || password === ''} onClick={this.login}>Login</button>
        <p />
        <Link to="/register">
          <div>Register</div>
        </Link>

        {errorMessage
          && <div>{errorMessage}</div>}
      </div>
    );
  }
}
