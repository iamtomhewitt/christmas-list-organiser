import React from 'react';
import { Link } from 'react-router-dom';
import { createAccount } from '../../api/account';
import './Register.scss';

export default class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      errorMessage: '',
      hasRegistered: false,
    };

    this.register.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  register = async () => {
    const {
      email, password, firstName, lastName,
    } = this.state;

    const response = await createAccount(email, password, firstName, lastName);
    const errorMessage = response.message || '';
    const hasRegistered = !response.error;
    this.setState({ errorMessage, hasRegistered });
  }

  canLogin = () => {
    const {
      email, password, firstName, lastName,
    } = this.state;

    return !(email && password && firstName && lastName);
  }

  render() {
    const {
      email, password, firstName, lastName, errorMessage, hasRegistered,
    } = this.state;

    return (
      <div className="register">
        <h1>Register</h1>

        <div className="warning">
          WARNING! There's no security on this, so don't use a personal password!
        </div>

        <input value={email} placeholder="email" onChange={this.handleChange} id="email" />
        <input value={password} placeholder="password" onChange={this.handleChange} id="password" type="password" />
        <input value={firstName} placeholder="first name" onChange={this.handleChange} id="firstName" />
        <input value={lastName} placeholder="last name" onChange={this.handleChange} id="lastName" />

        <button disabled={this.canLogin()} onClick={this.register}>Register</button>

        {errorMessage
          && <div>{errorMessage}</div>}

        {hasRegistered
          && (
            <div>
              Registered successfully!<br />
              <Link to="/">Return to Login</Link>
            </div>
          )}
      </div>
    );
  }
}
