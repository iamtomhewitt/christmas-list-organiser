import React from 'react';
import { Link } from 'react-router-dom';

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

  register = () => {
    const {
      email, password, firstName, lastName,
    } = this.state;

    fetch('http://localhost:8080/account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          this.setState({
            errorMessage: data.message,
          });
        } else {
          this.setState({
            errorMessage: '',
            hasRegistered: true,
          });
        }
      });
  }

  render() {
    const {
      email, password, firstName, lastName, errorMessage, hasRegistered,
    } = this.state;

    return (
      <div>
        <h1>Register</h1>
        <label>Email</label>
        <input value={email} onChange={this.handleChange} id="email" />
        <p />
        <label>Password</label>
        <input value={password} onChange={this.handleChange} id="password" type="password" />
        <p />
        <label>First Name</label>
        <input value={firstName} onChange={this.handleChange} id="firstName" />
        <p />
        <label>Last Name</label>
        <input value={lastName} onChange={this.handleChange} id="lastName" />
        <p />
        <button onClick={this.register}>Register</button>
        <p />

        {errorMessage
          && <div>{errorMessage}</div>}

        {hasRegistered
          && (
            <div>
              Registered!
              <p />
              <Link to="/">
                Return to login!
              </Link>
            </div>
          )}
      </div>
    );
  }
}
