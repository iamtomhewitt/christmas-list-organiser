import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getAccount } from '../../api/account';
import {
  dibChristmasListItem, getChristmasList, saveChristmasList,
} from '../../api/christmasList';
import { getLoggedInUser } from '../../util/sessionStorage';
import ChristmasListItem from './ChristmasListItem';
import './ChristmasList.scss';

class ChristmasList extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      email: '',
      newItemName: '',
      newItemImageUrl: '',
      newItemUrl: '',
      groups: [],
    };
  }

  async componentDidMount() {
    const { location } = this.props;
    const { email } = location || getLoggedInUser();
    const listIsForLoggedInUser = email === getLoggedInUser().email;
    this.setState({ email, listIsForLoggedInUser });

    const christmasList = await getChristmasList(email);
    const { items = [], groups = [], error } = christmasList;
    this.setState({ items, groups, error: error ? christmasList.message : '' });

    const account = await getAccount(email);
    const { firstName = '', lastName = '' } = account;
    this.setState({ firstName, lastName });
  }

  remove = async (item) => {
    const { items, groups } = this.state;
    const listWithoutItem = items.filter((i) => i !== item);
    const christmasList = await saveChristmasList(getLoggedInUser(), listWithoutItem, groups);
    this.setState({ items: christmasList.items, groups: christmasList.groups });
  }

  add = async () => {
    const {
      items, groups, newItemName, newItemImageUrl, newItemUrl,
    } = this.state;
    items.push({
      name: newItemName.trim(), url: newItemUrl, image: newItemImageUrl, dibbed: false,
    });

    const christmasList = await saveChristmasList(getLoggedInUser(), items, groups);
    this.setState({
      items: christmasList.items, groups: christmasList.groups, newItemName: '', newItemImageUrl: '', newItemUrl: '',
    });
  }

  dibItem = async (itemName) => {
    const { email } = this.state;
    const christmasList = await dibChristmasListItem(itemName, email, getLoggedInUser().email);
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
      items, newItemName, newItemImageUrl, newItemUrl, listIsForLoggedInUser, group,
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
            <input value={newItemUrl} placeholder="optional - website link" onChange={this.handleChange} id="newItemUrl" />
            <input value={newItemImageUrl} placeholder="optional - image link" onChange={this.handleChange} id="newItemImageUrl" />
            <button onClick={() => this.add()} disabled={newItemName === ''} type="button">Add New Item</button>
            {group && <div>Group: {group.name}</div>}
          </div>
        )}
      </>
    );
  }

  render() {
    const {
      email, listIsForLoggedInUser, firstName, lastName, error,
    } = this.state;
    const title = listIsForLoggedInUser ? 'Your Christmas List' : `Christmas List for ${firstName} ${lastName}`;

    const WithNoEmail = () => (
      <div className="christmas-list">
        <div className="no-email">
          <h3>Woops, I have lost the email you clicked on! Please go back and try again.</h3>
          <Link to="/search"><button type="button">Back to Search</button></Link>
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
          <Link to="/search"><button type="button">Back to Search</button></Link>
        </div>
      </div>
    );

    return (
      !email ? <WithNoEmail /> : error ? <Error /> : WithEmail
    );
  }
}

ChristmasList.propTypes = {
  location: PropTypes.object,
};

export default ChristmasList;
