import React from 'react';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: 'test@test.com'
    }

    this.login.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  login = () => {
    const { email } = this.state;

    fetch(`http://localhost:8080/account?email=${'asd'}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const { firstName, lastName } = data;
        console.log(firstName, lastName)
      })
  }

  render() {
    const { email } = this.state;

    return <div>
      <h1>Login</h1>
      {/* <button onClick={() => window.location = '#/home'}>Go to home</button> */}
      <input value={email} onChange={this.handleChange} id='email' />
      <button onClick={this.login}>login</button>
    </div>
  }
}