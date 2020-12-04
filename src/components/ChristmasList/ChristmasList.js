import React from 'react';
import { Link } from 'react-router-dom';
import { getAccount } from '../../api/account';
import {
  dibChristmasListItem, getChristmasList, saveChristmasList,
} from '../../api/christmasList';
import { getUserData } from '../../util/localStorage';
import { ChristmasListItem } from './ChristmasListItem';
import './ChristmasList.scss';

class ChristmasList extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      email: '',
      newItemName: '',
      newItemImageUrl: '',
      groups: [],
    };
  }

  remove = async (item) => {
    const { items, groups } = this.state;
    const listWithoutItem = items.filter((i) => i !== item);
    const christmasList = await saveChristmasList(getUserData(), listWithoutItem, groups);
    this.setState({ items: christmasList.items, groups: christmasList.groups });
  }

  add = async () => {
    const {
      items, groups, newItemName, newItemImageUrl,
    } = this.state;
    items.push({ name: newItemName.trim(), image: newItemImageUrl, dibbed: false });

    const christmasList = await saveChristmasList(getUserData(), items, groups);
    this.setState({ items: christmasList.items, groups: christmasList.groups, newItemName: '', newItemImageUrl: '' });
  }

  dibItem = async (itemName) => {
    const christmasList = await dibChristmasListItem(itemName, this.state.email, getUserData().email);
    const { items } = christmasList;
    this.setState({ items });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  renderList = () => {
    const {
      items, newItemName, newItemImageUrl, listIsForLoggedInUser, group,
    } = this.state;

    return (
      <>
        <ul>
          {items.map((item, i) => <ChristmasListItem key={i} item={item} remove={this.remove} dibItem={this.dibItem} listIsForLoggedInUser={listIsForLoggedInUser} />)}
        </ul>

        {items.length === 0 && <div className="no-items">Start adding to your Christmas List using the button below!</div>}

        {listIsForLoggedInUser && (
          <div className="new-item">
            <input value={newItemName} placeholder="new item" onChange={this.handleChange} id="newItemName" />
            <input value={newItemImageUrl} placeholder="optional - image url" onChange={this.handleChange} id="newItemImageUrl" />
            <button onClick={() => this.add()} disabled={newItemName === ''}>Add New Item</button>
            {group && <div>Group: {group.name}</div>}
          </div>
        )}
      </>
    );
  }

  async componentDidMount() {
    const { email } = this.props.location || getUserData();
    const listIsForLoggedInUser = email === getUserData().email;
    this.setState({ email, listIsForLoggedInUser });

    const christmasList = await getChristmasList(email);
    const { items = [], groups = [], error } = christmasList;
    this.setState({ items, groups, error: error ? christmasList.message : '' });

    const account = await getAccount(email);
    const { firstName = '', lastName = '' } = account;
    this.setState({ firstName, lastName });
  }

  render() {
    const {
      email, listIsForLoggedInUser, firstName, lastName, error,
    } = this.state;
    const title = listIsForLoggedInUser ? 'Your Christmas List' : `Christmas List for ${firstName} ${lastName}`;

    const WithNoEmail = () => (
      <div className="christmas-list">
        <div className="no-email">
          <h3>Woops, I've lost the email you clicked on! Please go back and try again.</h3>
          <Link to="/search"><button>Back to Search</button></Link>
        </div>
      </div>
    );

    const WithEmail = (
      <div className="christmas-list">
        <h1>{title}</h1>
        {this.renderList()}
      </div>
    );

    const Error = () => (
      <div className="christmas-list">
        <div className="error">
          <h3>Error! {error}</h3>
          <Link to="/search"><button>Back to Search</button></Link>
        </div>
      </div>
    );

    return (
      !email ? <WithNoEmail /> : error ? <Error /> : WithEmail
    );
  }
}

export default ChristmasList;
