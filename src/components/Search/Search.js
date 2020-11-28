import React from 'react';
import { Link } from 'react-router-dom';

class SearchPage extends React.Component {

  constructor() {
    super();
    this.state = {
      lists: [],
      filteredLists: [],
      searchCriteria: ''
    }
  }

  componentDidMount() {
    fetch('http://localhost:8080/christmas-list/all')
      .then((response) => response.json())
      .then((data) => this.setState({ lists: data, filteredLists: data }))
  }

  onChange = (event) => {
    const { id, value } = event.target;
    const { lists } = this.state;
    const filteredLists = lists.filter((list) => list.belongsTo.includes(value))

    this.setState({
      [id]: value,
      filteredLists
    });
  }

  render() {
    const { filteredLists, searchCriteria } = this.state;

    return (
      <>
        <h1>Search for a Christmas List</h1>
        <label>Their Email</label>
        <input value={searchCriteria} onChange={this.onChange} id='searchCriteria' />
        {filteredLists.map((list) => {
          return <Link to='/home'>
            <p>{list.belongsTo}</p>
          </Link>
        })}
        {filteredLists.length === 0 && <div>No lists found!</div>}
      </>
    );
  }
}

export default SearchPage;