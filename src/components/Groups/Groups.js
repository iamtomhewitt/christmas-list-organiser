import React from 'react';
import { getChristmasList } from '../../api/christmasList';
import {
  createGroup, getGroups, joinGroup, leaveGroup,
} from '../../api/groups';
import { getLoggedInUser } from '../../util/sessionStorage';
import { generateClass } from '../../util';
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

  async componentDidMount() {
    const { email } = getLoggedInUser();
    this.setState({ usersEmail: email });

    const groups = await getGroups();
    this.setState({ groups });

    const christmasList = await getChristmasList(email);
    this.setState({ christmasList });
  }

  alterGroup = async (name, joining) => {
    const { usersEmail } = this.state;
    const groupResponse = joining ? await joinGroup(usersEmail, name) : await leaveGroup(usersEmail, name);
    const christmasList = await getChristmasList(usersEmail);
    const errorMessage = groupResponse.message || '';
    this.setState({ christmasList, errorMessage });
  }

  createGroup = async (name) => {
    const groupResponse = await createGroup(name);
    const groups = await getGroups();
    const errorMessage = groupResponse.message || '';
    this.setState({ groups, errorMessage, newGroupName: '' });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  isJoined = (group) => {
    const { christmasList: { groups = [] } } = this.state;
    return groups.includes(group);
  }

  renderAvailableGroup = (group) => (
    <li key={group}>
      <button className="join-button" onClick={() => this.alterGroup(group, true)} type="button">+</button>
      <div>{group}</div>
    </li>
  )

  renderJoinedGroup = (group) => (
    <li key={group}>
      <button className="leave-button" onClick={() => this.alterGroup(group, false)} type="button">x</button>
      <div>{group}</div>
    </li>
  )

  render() {
    const {
      groups, newGroupName, errorMessage,
    } = this.state;

    const joinedGroups = groups.filter(this.isJoined);
    const availableGroups = groups.filter((g) => !this.isJoined(g));

    return (
      <div className={generateClass('groups')}>
        <h1>Groups</h1>
        {availableGroups.length > 0
          && (
            <>
              <h3>Available Groups</h3>
              <ul>
                {availableGroups.map((g) => this.renderAvailableGroup(g))}
              </ul>
            </>
          )}

        {joinedGroups.length > 0
          && (
            <>
              <h3>Your Groups</h3>
              <ul>
                {joinedGroups.map((g) => this.renderJoinedGroup(g))}
              </ul>
            </>
          )}

        <input value={newGroupName} placeholder="new group name" id="newGroupName" onChange={this.handleChange} />
        <button className="create-button" onClick={() => this.createGroup(newGroupName)} disabled={newGroupName === ''} type="button">Create New Group</button>

        {errorMessage && <div>{errorMessage}</div>}
      </div>
    );
  }
}

export default Groups;
