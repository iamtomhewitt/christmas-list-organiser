import React from 'react';
import { Link } from 'react-router-dom';
import { getAccount } from '../../api/account';
import {
  createChristmasList, dibChristmasListItem, getChristmasList, saveChristmasList,
} from '../../api/christmasList';
import { getUserData } from '../../util/localStorage';
import './ChristmasList.scss'

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
    items.push({ name: newItemName.trim(), dibbed: false });

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

  dibItem = (itemName) => {
    const christmasListOwner = this.state.email;
    const dibbedBy = getUserData().email;
    dibChristmasListItem(itemName, christmasListOwner, dibbedBy)
      .then((data) => this.setState({ items: data.items }));
  }

  renderItem = (item, i) => {
    const { name, dibbedBy, dibbed } = item;
    const { firstName = '', lastName = '' } = dibbedBy || {};
    const { listIsForLoggedInUser } = this.state;

    const itemForLoggedInUser = (
      <>
        <button className='remove-button' onClick={() => this.remove(item)}>X</button>
        {name}
      </>
    );

    const itemForNotLoggedInUser = (
      <div>
        <div>{name} {dibbed ? `Dibbed by ${firstName} ${lastName}` : <button onClick={() => this.dibItem(name)}>Dib this item</button>}</div>
      </div>
    );

    return (
      <li key={i} className='item'>
        {listIsForLoggedInUser ? itemForLoggedInUser : itemForNotLoggedInUser}
        <hr/>
      </li>
    );
  }

  renderList = () => {
    const {
      items, newItemName, listIsForLoggedInUser, group,
    } = this.state;

    return (
      <>
        <ul>
          {items.map((item, i) => this.renderItem(item, i))}
        </ul>
        {listIsForLoggedInUser && (
          <div className='new-item'>
            <input value={newItemName} placeholder='new item' onChange={this.handleChange} id="newItemName" />
            <button onClick={() => this.add()} disabled={newItemName === ''}>Add New Item</button>
            {group && <div>Group: {group.name}</div>}
          </div>
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
      .then((data) => this.setState({ items: data.items, group: data.group }));

    getAccount(email)
      .then((data) => this.setState({ firstName: data.firstName, lastName: data.lastName }));
  }

  render() {
    const {
      items, email, listIsForLoggedInUser, firstName, lastName,
    } = this.state;
    const title = listIsForLoggedInUser ? `Your Christmas List` : `Christmas List for ${firstName} ${lastName}`;

    return (
      email === undefined
        ? (
          <div className='christmas-list'>
            <h3>Woops, there seems to be no email! Please go back and try again.</h3>
            <Link to="/search"><button>Back to Search</button></Link>
          </div>
        )
        : (
          <div className='christmas-list'>
            <h3>{title}</h3>
            {items ? this.renderList() : this.renderEmptyList()}
          </div>
        )
    );
  }
}

export default ChristmasList;
