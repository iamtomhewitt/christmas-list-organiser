import React from 'react';
import { getUserData } from '../../util/localStorage';

class ChristmasList extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      email: '',
      newItemName: '',
    };
  }

  makePostRequest = (items) => fetch('http://localhost:8080/christmas-list', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      belongsTo: this.state.email,
      items,
    }),
  })

  remove = (item) => {
    const { items } = this.state;
    const listWithoutItem = items.filter((i) => i !== item);

    this.makePostRequest(listWithoutItem)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ items: data.items });
      });
  }

  add = () => {
    const { items, newItemName } = this.state;
    items.push({ name: newItemName.trim(), dibbedBy: ' ', dibbed: false });

    this.makePostRequest(items)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ items: data.items, newItemName: ' ' });
      });
  }

  createList = () => {
    const newItem = {
      name: 'New Item',
      dibbyBy: 'No one',
      dibbed: false,
    };

    this.makePostRequest([newItem])
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ items: data.items });
      });
  }
  // TODO move the above methods to an api file

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  renderItem = (item, i) => {
    const { name, dibbedBy, dibbed } = item;
    return (
      <li key={i}>
        <button onClick={() => this.remove(item)}>Remove</button>
        {name}
        {' '}
        |
        {dibbed ? `Dibbed by ${dibbedBy}` : 'Available!'}
      </li>
    );
  }

  renderList = (items) => {
    const { newItemName } = this.state;
    return (
      <>
        <ul>
          {items.map((item, i) => this.renderItem(item, i))}
        </ul>
        <input value={newItemName} onChange={this.handleChange} id="newItemName" />
        <button onClick={() => this.add()}>Add New Item</button>
      </>
    );
  }

  renderEmptyList = () => (
    <>
      <div>You don't have a Christmas list!</div>
      <div>
        <button onClick={() => this.createList()}>Create List</button>
      </div>
    </>
  )

  componentDidMount() {
    const { email } = getUserData();
    this.setState({ email });

    fetch('http://localhost:8080/christmas-list?email=tommhewitt@gmail.com')
      .then((response) => response.json())
      .then((data) => this.setState({ items: data.items }));
  }

  render() {
    const { items } = this.state;
    return (
      <div>
        <h3>Your Christmas List</h3>
        {items ? this.renderList(items) : this.renderEmptyList()}
      </div>
    );
  }
}

export default ChristmasList;
