import React from 'react';
import { Link } from 'react-router-dom';
import { getAllChristmasLists } from '../../api/christmasList';
import { getUserData } from '../../util/localStorage';

class SearchPage extends React.Component {
  constructor() {
    super();
    const { email } = getUserData();
    this.state = {
      lists: [],
      filteredLists: [],
      searchCriteria: '',
      usersEmail: email,
      listForUser: { groups: [] },
    };
  }

  componentDidMount() {
    getAllChristmasLists()
      .then((response) => response.json())
      .then((data) => {
        const { usersEmail } = this.state;
        const listsForOtherUsers = data.filter((list) => list.belongsTo !== usersEmail);
        const listForUser = data.filter((list) => list.belongsTo === usersEmail)[0];
        const filteredLists = this.filterByUsersGroups(listsForOtherUsers, listForUser.groups);

        this.setState({ lists: data, filteredLists, listForUser });
      });
  }

  onChange = (event) => {
    const { id, value } = event.target;
    const { lists, usersEmail, listForUser: { groups } } = this.state;
    const listsToFilter = lists.filter((list) => list.belongsTo.includes(value) && list.belongsTo !== usersEmail);
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
        if (usersGroups.includes(group)) {
          filteredLists.push(list);
        }
      }
    }
    return filteredLists;
  }

  render() {
    const { filteredLists, searchCriteria, listForUser } = this.state;

    return (
      <>
        <h1>Search for a Christmas List</h1>
        <label>Their Email</label>
        <input value={searchCriteria} onChange={this.onChange} id="searchCriteria" />
        {filteredLists.map((list, i) => (
          <Link key={i} to={{ pathname: '/christmasList', email: list.belongsTo }}>
            <p>{list.belongsTo}</p>
          </Link>
        ))}
        {filteredLists.length === 0 && <div>No lists found!</div>}
        <div>
          Can&apos;t see someones list? They might be in a group you are not a part of.
          Join a group <Link to="/groups">here</Link>.
          <br />You are in these groups:
          {listForUser && listForUser.groups.map((group, i) => <li key={i}>{group}</li>)}
        </div>
      </>
    );
  }
}

export default SearchPage;
