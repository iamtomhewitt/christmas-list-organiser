import React from 'react';
import { Link } from 'react-router-dom';
import { createAccount } from '../../api/account';
import { generateClass } from '../../util';
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
      loading: false,
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

    this.setState({ loading: true });
    const response = await createAccount(email, password, firstName, lastName);
    const errorMessage = response.message || '';
    const hasRegistered = !response.error;
    this.setState({ errorMessage, hasRegistered, loading: false });
  }

  canLogin = () => {
    const {
      email, password, firstName, lastName,
    } = this.state;

    return !(email && password && firstName && lastName);
  }

  render() {
    const {
      email, password, firstName, lastName, errorMessage, hasRegistered, loading,
    } = this.state;

    return (
      <div className={generateClass('register')}>
        <h1>Register</h1>

        <div className="warning">
          WARNING! There is no security on this, so do not use a personal password!
        </div>

        <input value={email} placeholder="email" onChange={this.handleChange} id="email" />
        <input value={password} placeholder="password" onChange={this.handleChange} id="password" type="password" />
        <input value={firstName} placeholder="first name" onChange={this.handleChange} id="firstName" />
        <input value={lastName} placeholder="last name" onChange={this.handleChange} id="lastName" />

        <button disabled={this.canLogin()} onClick={this.register} type="submit">Register</button>

        {errorMessage && <div>{errorMessage}</div>}

        {loading && <div>Loading...</div>}

        {hasRegistered
          && (
            <div>
              Registered successfully! Click <Link to="/">here</Link> to login.
            </div>
          )}
      </div>
    );
  }
}
