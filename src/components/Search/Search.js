import React from 'react';
import { Link } from 'react-router-dom';
import { getAllChristmasLists } from '../../api/christmasList';
import { getLoggedInUser } from '../../util/sessionStorage';
import { generateClass } from '../../util';
import './Search.scss';

class SearchPage extends React.Component {
  constructor() {
    super();
    const { email } = getLoggedInUser();
    this.state = {
      lists: [],
      filteredLists: [],
      searchCriteria: '',
      usersEmail: email,
      listForUser: { groups: [] },
    };
  }

  async componentDidMount() {
    const { usersEmail } = this.state;
    const lists = await getAllChristmasLists();
    const listsForOtherUsers = lists.filter((list) => list.belongsTo.email !== usersEmail);
    const listForUser = lists.filter((list) => list.belongsTo.email === usersEmail)[0];
    const filteredLists = Array.from(new Set(this.filterByUsersGroups(listsForOtherUsers, listForUser.groups)));

    this.setState({ lists, filteredLists, listForUser });
  }

  onChange = (event) => {
    const { id, value } = event.target;
    const { lists, usersEmail, listForUser: { groups } } = this.state;
    const listsToFilter = lists.filter((list) => list.belongsTo.email.includes(value) && list.belongsTo.email !== usersEmail);
    const filteredLists = this.filterByUsersGroups(listsToFilter, groups);

    this.setState({
      [id]: value,
      filteredLists,
    });
  }

  filterByUsersGroups = (listToFilter, usersGroups) => {
    const filteredLists = [];
    for (const list of listToFilter) {
      for (const group of list.groups) {
        if (usersGroups.includes(group) && !filteredLists.includes(list)) {
          filteredLists.push(list);
        }
      }
    }
    return filteredLists;
  }

  renderPerson = (list) => (
    <li key={list.belongsTo.email} className="person">
      <Link to={{ pathname: '/christmasList', email: list.belongsTo.email }}>
        {list.belongsTo.email}
      </Link>
    </li>
  )

  render() {
    const { filteredLists, searchCriteria, listForUser } = this.state;

    return (
      <div className={generateClass('search')}>
        <h1>Search for a Christmas List</h1>
        <input value={searchCriteria} placeholder="their name or email" onChange={this.onChange} id="searchCriteria" />
        <ul>
          {filteredLists.map(this.renderPerson)}
        </ul>

        {filteredLists.length === 0 && <div className="no-lists">No lists found!</div>}

        <div className="group-info">
          Can&apos;t see someones list? They might be in a group you are not a part of.
          Join a group <Link to="/groups">here</Link>.
          <p /><span>You are in these groups:</span>
          {listForUser
            && (
              <ul>
                {listForUser.groups.map((group, i) => <li key={i}>{group}</li>)}
              </ul>
            )}
        </div>
      </div>
    );
  }
}

export default SearchPage;
