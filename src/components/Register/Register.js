import React from 'react';

export default class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      email: 'q',
      password: 'q',
      firstName: 'q',
      lastName: 'q',
      errorMessage: '',
      statusMessage: '',
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
        console.log(response);
        if (!response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          this.setState({
            errorMessage: data.message,
            statusMessage: '',
          });
        } else {
          this.setState({
            errorMessage: '',
            statusMessage: 'Registered!',
          });
        }
      });
  }

  render() {
    const {
      email, password, firstName, lastName, errorMessage, statusMessage,
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

        {statusMessage
        && <div>{statusMessage}</div>}
      </div>
    );
  }
}
