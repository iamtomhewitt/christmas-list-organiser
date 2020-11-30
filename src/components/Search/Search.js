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
    };
  }

  componentDidMount() {
    getAllChristmasLists()
      .then((response) => response.json())
      .then((data) => {
        const listsForOtherUsers = data.filter((list) => list.belongsTo !== this.state.usersEmail);
        const listForUser = data.filter((list) => list.belongsTo === this.state.usersEmail)[0];

        let filteredLists = []
        for (const list of listsForOtherUsers) {
          for (const group of list.groups) {
            if (listForUser.groups.includes(group)) {
              filteredLists.push(list);
            }
          }
        }

        this.setState({ lists: data, filteredLists });
      });
  }

  onChange = (event) => {
    const { id, value } = event.target;
    const { lists, usersEmail } = this.state;
    const filteredLists = lists.filter((list) => list.belongsTo.includes(value) && list.belongsTo !== usersEmail);

    this.setState({
      [id]: value,
      filteredLists,
    });
  }

  render() {
    const { filteredLists, searchCriteria } = this.state;

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
        <div>Can't see someones list? They might be in a group you are not a part of. Join a grop <Link to="/groups">here</Link>.</div>
        {filteredLists.length === 0 && <div>No lists found!</div>}
      </>
    );
  }
}

export default SearchPage;
