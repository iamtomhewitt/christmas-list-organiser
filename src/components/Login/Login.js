import React from 'react';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: 'test@test.com',
      password: 'password',
      errorMessage: ''
    }

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
        console.log(data)
        if (data.error) {
          this.setState({ errorMessage: data.message });
        }
        else {
          console.log('all good')
        }
      })
  }

  render() {
    const { email, password, errorMessage } = this.state;

    return <div>
      <h1>Login</h1>
      {/* <button onClick={() => window.location = '#/home'}>Go to home</button> */}
      <input value={email} onChange={this.handleChange} id='email' />
      <p></p>
      <input value={password} onChange={this.handleChange} id='password' type="password" />
      <p></p>
      <button onClick={this.login}>login</button>

      {errorMessage &&
        <div>{errorMessage}</div>
      }
    </div>
  }
}