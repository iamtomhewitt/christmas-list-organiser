import React from 'react';
import { getChristmasList } from '../../api/christmasList';
import { getGroups, joinGroup } from '../../api/groups';
import { getUserData } from '../../util/localStorage';

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
    };
  }

  componentDidMount() {
    const { email } = getUserData();
    this.setState({ usersEmail: email });

    getGroups()
      .then((groups) => this.setState({ groups }));

    getChristmasList(email)
      .then((christmasList) => { this.setState({ christmasList }); });
  }

  joinGroup(name) {
    const { usersEmail } = this.state;
    joinGroup(usersEmail, name)
      .then((response) => {
        if (!response.ok) {
          this.setState({ errorMessage: response.body });
        } else {
          getChristmasList(usersEmail)
            .then((christmasList) => { this.setState({ christmasList }); });
        }
      });
  }

  leaveGroup(name) {
    console.log(name);
  }

  render() {
    const { groups, christmasList } = this.state;

    const availableGroups = groups.filter((group) => !christmasList.groups.includes(group));
    const joinedGroups = groups.filter((group) => christmasList.groups.includes(group));

    return (
      <>
        <h1>Groups</h1>
        <h3>Available Groups</h3>
        <ul>
          {availableGroups.map((group, i) => (
            <li key={i}>
              {group}
              <button onClick={() => this.joinGroup(group)}>Join Group</button>
            </li>
          ))}
        </ul>

        <h3>Your Groups</h3>
        <ul>
          {joinedGroups.map((group, i) => (
            <li key={i}>
              {group}
              <button onClick={() => this.leaveGroup(group)}>Leave Group</button>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default Groups;
