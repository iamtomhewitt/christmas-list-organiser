import React from 'react';
import { getChristmasList } from '../../api/christmasList';
import {
  createGroup, getGroups, joinGroup, leaveGroup,
} from '../../api/groups';
import { getUserData } from '../../util/localStorage';
import './Groups.scss';

class Groups extends React.Component {
  constructor() {
    super();
    this.state = {
      groups: [],
      christmasList: {
        groups: [],
      },
      usersEmail: '',
      errorMessage: '',
      newGroupName: '',
    };
  }

  componentDidMount() {
    const { email } = getUserData();
    this.setState({ usersEmail: email });

    getGroups()
      .then((groups) => this.setState({ groups }));

    getChristmasList(email)
      .then((christmasList) => this.setState({ christmasList }));
  }

  joinGroup(name) {
    const { usersEmail } = this.state;
    joinGroup(usersEmail, name)
      .then((response) => {
        if (!response.ok) {
          this.setState({ errorMessage: response.body });
        } else {
          getChristmasList(usersEmail)
            .then((christmasList) => this.setState({ christmasList }));
        }
      });
  }

  leaveGroup(name) {
    const { usersEmail } = this.state;
    leaveGroup(usersEmail, name)
      .then((response) => {
        if (!response.ok) {
          this.setState({ errorMessage: response.body });
        } else {
          getChristmasList(usersEmail)
            .then((christmasList) => { this.setState({ christmasList }); });
        }
      });
  }

  createGroup(name) {
    createGroup(name)
      .then((response) => {
        if (!response.ok) {
          return response.json();
        }
        getGroups()
          .then((groups) => this.setState({ groups }));
      })
      .then((err) => this.setState({ errorMessage: err?.message || ' ', newGroupName: '' }));
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  render() {
    const {
      groups, christmasList, newGroupName, errorMessage,
    } = this.state;

    const availableGroups = groups.filter((group) => !christmasList.groups.includes(group));
    const joinedGroups = groups.filter((group) => christmasList.groups.includes(group));

    return (
      <div className="groups">
        <h1>Groups</h1>
        <h3>Available Groups</h3>
        <ul>
          {availableGroups.map((group, i) => (
            <li key={i}>
              <button className="join-button" onClick={() => this.joinGroup(group)}>+</button>
              <div>{group}</div>
            </li>
          ))}
        </ul>

        <h3>Your Groups</h3>
        <ul>
          {joinedGroups.map((group, i) => (
            <li key={i}>
              <button className="leave-button" onClick={() => this.leaveGroup(group)}>x</button>
              <div>{group}</div>
            </li>
          ))}
        </ul>

        <input value={newGroupName} placeholder="new group name" id="newGroupName" onChange={this.handleChange} />
        <button className='create-button' onClick={() => this.createGroup(newGroupName)} disabled={newGroupName === ''}>Create New Group</button>

        {errorMessage && <div>{errorMessage}</div>}
      </div>
    );
  }
}

export default Groups;
