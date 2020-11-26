import React from 'react';
import { getUserData } from '../../util/localStorage';

class ChristmasList extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  }

  remove = (item) => {
    const { items } = this.state;
    const { email } = getUserData();
    const listWithoutItem = items.filter((i) => i !== item);

    fetch('http://localhost:8080/christmas-list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        belongsTo: email,
        items: listWithoutItem,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ items: data.items });
      });
  }

  componentDidMount() {
    fetch('http://localhost:8080/christmas-list?email=tommhewitt@gmail.com')
      .then((response) => response.json())
      .then((data) => this.setState({ items: data.items }));
  }

  render() {
    const { items } = this.state;
    return (
      <div>
        <h3>Your Christmas List</h3>
        {items
          && (
            <ul>
              {items.map((item, i) => {
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
              })}
            </ul>
          )}
        {items.length === 0
          && <div>No items!</div>}
      </div>
    );
  }
}

export default ChristmasList;
