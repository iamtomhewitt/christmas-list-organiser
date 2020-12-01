import React from 'react';
import './ChristmasListItem.scss';

const ItemForLoggedInUser = ({ item, remove }) => {
  const { name } = item;
  return (
    <li className="christmas-list-item">
      <button className="remove-button" onClick={() => remove(item)}>X</button>

      <img src="https://freeiconshop.com/wp-content/uploads/edd/gift-flat.png" alt="" />
      <div>{name}</div>
    </li>
  );
};

const ItemForNonLoggedInUser = ({ item, dibItem }) => {
  const { name, dibbed, dibbedBy } = item;
  const { firstName = '', lastName = '' } = dibbedBy || {};
  return (
    <li className="christmas-list-item">{name}
      {dibbed
        ? `Dibbed by ${firstName} ${lastName}`
        : <button onClick={() => dibItem(name)}>Dib this item</button>}
    </li>
  );
};

export const ChristmasListItem = ({
  item, remove, dibItem, listIsForLoggedInUser,
}) => (
  listIsForLoggedInUser ? <ItemForLoggedInUser item={item} remove={remove} /> : <ItemForNonLoggedInUser item={item} dibItem={dibItem} />
);
