import React from 'react';
import { Link } from 'react-router-dom';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: 'test@test.com',
      password: 'password',
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

    fetch(`http://localhost:8080/account/validate?email=${email}&password=${password}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          this.setState({ errorMessage: data.message });
        } else {
          console.log('all good');
        }
      });
  }

  render() {
    const { email, password, errorMessage } = this.state;

    return (
      <div>
        <h1>Login</h1>
        {/* <button onClick={() => window.location = '#/home'}>Go to home</button> */}
        <input value={email} onChange={this.handleChange} id="email" />
        <p />
        <input value={password} onChange={this.handleChange} id="password" type="password" />
        <p />
        <button onClick={this.login}>login</button>
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
