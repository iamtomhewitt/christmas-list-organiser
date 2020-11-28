import React from 'react';
import { createChristmasList, getChristmasList, saveChristmasList } from '../../api/christmasList';
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

  remove = (item) => {
    const { items, email } = this.state;
    const listWithoutItem = items.filter((i) => i !== item);

    saveChristmasList(email, listWithoutItem)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ items: data.items });
      });
  }

  add = () => {
    const { items, newItemName, email } = this.state;
    items.push({ name: newItemName.trim(), dibbedBy: ' ', dibbed: false });

    saveChristmasList(email, items)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ items: data.items, newItemName: ' ' });
      });
  }

  createList = () => {
    createChristmasList(this.state.email)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ items: data.items });
      });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  renderItem = (item, i) => {
    const { name, dibbedBy, dibbed } = item;
    const { listIsForLoggedInUser } = this.state;

    const itemForLoggedInUser = (
      <div>
        <button onClick={() => this.remove(item)}>Remove</button>
        {name}
      </div>
    );

    const itemForNotLoggedInUser = (
      <div>
        {name} | {dibbed ? `Dibbed by ${dibbedBy}` : 'Available!'}
      </div>
    );

    return (
      <li key={i}>
        {listIsForLoggedInUser ? itemForLoggedInUser : itemForNotLoggedInUser}
      </li>
    );
  }

  renderList = (items) => {
    const { newItemName, listIsForLoggedInUser } = this.state;

    return (
      <>
        <ul>
          {items.map((item, i) => this.renderItem(item, i))}
        </ul>
        {listIsForLoggedInUser && (
          <>
            <input value={newItemName} onChange={this.handleChange} id="newItemName" />
            <button onClick={() => this.add()}>Add New Item</button>
          </>
        )}
      </>
    );
  }

  renderEmptyList = () => {
    const { listIsForLoggedInUser } = this.state;

    return (
      listIsForLoggedInUser
        ? (
          <>
            <div>You don't have a Christmas list!</div>
            <div>
              <button onClick={() => this.createList()}>Create List</button>
            </div>
          </>
        )
        : (
          <>
            <div>This person does not have a Christmas list yet!</div>
          </>
        )
    );
  }

  componentDidMount() {
    const { email } = this.props.location || getUserData();
    const listIsForLoggedInUser = email === getUserData().email;
    this.setState({ email, listIsForLoggedInUser });

    getChristmasList(email)
      .then((response) => response.json())
      .then((data) => this.setState({ items: data.items }));
  }

  render() {
    const { items, email, listIsForLoggedInUser } = this.state;
    const title = listIsForLoggedInUser ? `Your Christmas List (${email})` : `Christmas List for ${email}`;
    return (
      <div>
        <h3>{title}</h3>
        {items ? this.renderList(items) : this.renderEmptyList()}
      </div>
    );
  }
}

export default ChristmasList;
